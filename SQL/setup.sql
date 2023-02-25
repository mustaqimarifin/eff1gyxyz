--- PAGES
CREATE TABLE pages (
  slug text UNIQUE NOT NULL,
  view_count bigint DEFAULT 1 NOT NULL
);

--- PUBLIC PROFILE

CREATE TABLE profiles (
  id uuid REFERENCES auth.users NOT NULL,
  updated_at timestamp WITH time zone,
  user_name text NOT NULL,
  full_name text,
  avatar_url text NOT NULL,
 
);

-- COMMENTS

CREATE TABLE comments (
id uuid NOT NULL DEFAULT uuid_v7(),
slug text NOT NULL REFERENCES pages (slug),
"authorId" uuid NOT NULL REFERENCES profiles (id),
"parentId" uuid NULL REFERENCES comments (id),
"createdAt" timestamp WITH time zone DEFAULT NOW() NOT NULL,
"updatedAt" timestamp WITH time zone DEFAULT NOW() NULL,
"text" text NOT NULL,
);


-- Set up Realtime!
BEGIN;
DROP publication IF EXISTS supabase_realtime;
CREATE publication supabase_realtime;
COMMIT;
ALTER publication supabase_realtime
ADD TABLE 
pages,
  comments,
  votes,
  profiles;
  
  
CREATE UNIQUE INDEX comments_pkey ON comments USING btree (id);

ALTER TABLE comments
ADD CONSTRAINT comments_pkey PRIMARY KEY USING INDEX comments_pkey;

ALTER TABLE comments
ADD CONSTRAINT comments_parent_id_fkey FOREIGN KEY ("parentId") REFERENCES comments(id) ON DELETE CASCADE;

ALTER TABLE comments
ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY ("authorId") REFERENCES auth.users(id) ON DELETE CASCADE;


ALTER TABLE comments enable ROW LEVEL SECURITY;

CREATE policy "Posts are viewable by everyone." ON comments FOR
SELECT USING (TRUE);

CREATE policy "Users can post as themselves." ON comments FOR
INSERT WITH CHECK (auth.uid() = "authorId");


ALTER TABLE profiles enable ROW LEVEL SECURITY;

CREATE policy "Public profiles are viewable by everyone." ON profiles FOR
SELECT USING (TRUE);

CREATE policy "Users can insert their own profile." ON profiles FOR
INSERT WITH CHECK (auth.uid() = id);

CREATE policy "Users can update own profile." ON profiles FOR
UPDATE USING (auth.uid() = id);



-- PROFILE & AUTH TRIGGER
CREATE FUNCTION public.handle_new_user() RETURNS trigger AS $$ BEGIN
INSERT INTO public.profiles (id, user_name, full_name, avatar_url)
VALUES (
    new.id,
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
RETURN new;
END;
$$ language plpgsql SECURITY DEFINER;
CREATE trigger on_auth_user_created
AFTER
INSERT ON auth.users FOR each ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION increment_page_view(page_slug TEXT) RETURNS void LANGUAGE plpgsql AS $$ BEGIN IF EXISTS (
    SELECT
    FROM pages
    WHERE slug = page_slug
  ) THEN
UPDATE pages
SET view_count = view_count + 1
WHERE slug = page_slug;
ELSE
INSERT INTO pages(slug)
VALUES (page_slug);
END IF;
END;
$$;



--- VOTES
CREATE TABLE votes (
  "combId" bigint NOT NULL REFERENCES comments (cn_id),
  "authorId" uuid NOT NULL REFERENCES profiles (id),
  "value" int NOT NULL,
  PRIMARY KEY ("combId", "authorId"),
  CONSTRAINT vote_quantity CHECK (
    value <= 1
    AND value >= -1
  )
);
ALTER TABLE votes enable ROW LEVEL SECURITY;
CREATE policy "Votes are viewable by everyone" ON votes FOR
SELECT USING (TRUE);
CREATE policy "Users can vote as themselves" ON votes FOR
INSERT WITH CHECK (auth.uid() = "authorId");
CREATE policy "Users can update their own votes" ON votes FOR
UPDATE USING (auth.uid() = "authorId");