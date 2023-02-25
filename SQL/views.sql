DROP VIEW IF EXISTS comments_thread_with_user_vote;
DROP VIEW IF EXISTS comments_thread;
DROP VIEW IF EXISTS comments_with_author_votes;
DROP VIEW IF EXISTS comments_linear_view;
DROP VIEW IF EXISTS comment_with_author;
CREATE VIEW comment_with_author AS
SELECT p.id,
  p.name,
  p.image,
  p."parentId",
  p.cn_id,
  p.cnp_id,
  p.slug,
  p."createdAt",
  p."updatedAt",
  p.text,
  p."authorId",
  to_jsonb(u) AS "author"
FROM comments p
  INNER JOIN profiles u ON p."authorId" = u.id;
CREATE VIEW comments_linear_view AS
SELECT root_c.*,
  to_jsonb(parent_c) AS parent,
  coalesce(
    json_agg(children_c) filter (
      WHERE children_c.id IS NOT NULL
    ),
    '[]'
  ) AS replies
FROM comment_with_author root_c
  INNER JOIN comment_with_author parent_c ON root_c.cnp_id = parent_c.cn_id
  LEFT JOIN comment_with_author children_c ON children_c.cnp_id = root_c.cn_id
GROUP BY root_c.id,
  root_c."parentId",
  root_c.name,
  root_c.image,
  root_c.cn_id,
  root_c.cnp_id,
  root_c.slug,
  root_c."createdAt",
  root_c."updatedAt",
  root_c.text,
  root_c."authorId",
  root_c."author",
  parent_c.*;
---
CREATE OR REPLACE VIEW comments_with_author_votes AS
SELECT p.id,
  p."parentId",
  p.name,
  p.image,
  p.cn_id,
  p.cnp_id,
  p.slug,
  p."createdAt",
  p."updatedAt",
  p.text,
  p."authorId",
  p."author",
  coalesce (sum (v.value) over w, 0) AS "votes",
  sum (
    CASE
      WHEN v.value > 0 THEN 1
      ELSE 0
    END
  ) over w AS "upvotes",
  sum (
    CASE
      WHEN v.value < 0 THEN 1
      ELSE 0
    END
  ) over w AS "downvotes" -- (select case when auth.uid() = v."authorId" then v.value else 0 end) as "userVoteValue"
FROM comment_with_author p
  LEFT JOIN "votes" v ON p.cn_id = v."combId" window w AS (PARTITION by v."combId");
---
CREATE recursive VIEW comments_thread (
  id,
  cn_id,
  cnp_id,
  slug,
  "name",
  "image",
  "createdAt",
  "updatedAt",
  "text",
  "authorId",
  "parentId",
  "author",
  "votes",
  "upvotes",
  "downvotes",
  depth,
  "path",
  "pathVotesRecent",
  "pathLeastRecent",
  "pathMostRecent"
) AS
SELECT id,
  cn_id,
  cnp_id,
  slug,
  "name",
  "image",
  "createdAt",
  "updatedAt",
  "text",
  "authorId",
  "parentId",
  "author",
  "votes",
  "upvotes",
  "downvotes",
  0 AS depth,
  array [cn_id] AS "path",
  array [cn_id] AS "pathVotesRecent",
  array [cn_id] AS "pathLeastRecent",
  array [cn_id] AS "pathMostRecent"
FROM comments_with_author_votes
WHERE cnp_id IS NULL
UNION
SELECT p1.id,
  p1.cn_id,
  p1.cnp_id,
  p1.name,
  p1.image,
  p1.slug,
  p1."createdAt",
  p1."updatedAt",
  p1.text,
  p1."authorId",
  p1."parentId",
  p1."author",
  p1."votes",
  p1."upvotes",
  p1."downvotes",
  p2.depth + 1 AS depth,
  p2."path" || p1.cn_id::bigint AS "path",
  p2."pathVotesRecent" || - p1."votes"::bigint || - extract(
    epoch
    FROM p1."createdAt"
  )::bigint || p1.cn_id AS "pathVotesRecent",
  p2."pathLeastRecent" || extract(
    epoch
    FROM p1."createdAt"
  )::bigint || p1.cn_id AS "pathLeastRecent",
  p2."pathMostRecent" || - extract(
    epoch
    FROM p1."createdAt"
  )::bigint || p1.cn_id AS "pathMostRecent"
FROM comments_with_author_votes p1
  JOIN comments_thread p2 ON p1.cnp_id = p2.cn_id;
----
CREATE OR REPLACE VIEW comments_thread_with_user_vote AS
SELECT DISTINCT ON (id) id,
  cn_id,
  cnp_id,
  slug,
  "createdAt",
  "updatedAt",
  "name",
  "image",
  "text",
  "authorId",
  "parentId",
  "author",
  "votes",
  "upvotes",
  "downvotes",
  "depth",
  "path",
  "pathVotesRecent",
  "pathLeastRecent",
  "pathMostRecent",
  coalesce(
    (
      SELECT v."value"
      FROM "votes" v
      WHERE auth.uid() = v."authorId"
        AND v."combId" = cn_id
    ),
    0
  ) AS "userVoteValue"
FROM comments_thread