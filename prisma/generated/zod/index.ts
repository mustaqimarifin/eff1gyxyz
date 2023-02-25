import { z } from "zod";
import { type Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "type",
  "provider",
  "providerAccountId",
  "refresh_token",
  "access_token",
  "expires_at",
  "token_type",
  "scope",
  "id_token",
  "session_state",
]);

export const CommentScalarFieldEnumSchema = z.enum([
  "id",
  "text",
  "createdAt",
  "updatedAt",
  "userId",
  "parentId",
  "slug",
]);

export const GuestbookScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "body",
  "createdAt",
  "updatedAt",
]);

export const LikeScalarFieldEnumSchema = z.enum(["userId", "commentId"]);

export const PostScalarFieldEnumSchema = z.enum(["slug", "count"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const SessionScalarFieldEnumSchema = z.enum([
  "id",
  "sessionToken",
  "userId",
  "expires",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "role",
  "name",
  "email",
  "emailVerified",
  "isAdmin",
  "image",
]);

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  "identifier",
  "token",
  "expires",
]);

export const RoleSchema = z.enum(["BLOCKED", "USER", "ADMIN"]);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.bigint(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().uuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  isAdmin: z.boolean(),
  image: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

/////////////////////////////////////////
// GUESTBOOK SCHEMA
/////////////////////////////////////////

export const GuestbookSchema = z.object({
  id: z.bigint(),
  userId: z.string().nullable(),
  body: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Guestbook = z.infer<typeof GuestbookSchema>;

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  slug: z.string(),
  count: z.bigint(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string().nullable(),
  parentId: z.string().nullable(),
  slug: z.string().nullable(),
});

export type Comment = z.infer<typeof CommentSchema>;

/////////////////////////////////////////
// LIKE SCHEMA
/////////////////////////////////////////

export const LikeSchema = z.object({
  userId: z.string(),
  commentId: z.string(),
});

export type Like = z.infer<typeof LikeSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z
  .object({
    select: z.lazy(() => AccountSelectSchema).optional(),
    include: z.lazy(() => AccountIncludeSchema).optional(),
  })
  .strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    type: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerAccountId: z.boolean().optional(),
    refresh_token: z.boolean().optional(),
    access_token: z.boolean().optional(),
    expires_at: z.boolean().optional(),
    token_type: z.boolean().optional(),
    scope: z.boolean().optional(),
    id_token: z.boolean().optional(),
    session_state: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    id: z.boolean().optional(),
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => LikeFindManyArgsSchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    messages: z
      .union([z.boolean(), z.lazy(() => GuestbookFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      accounts: z.boolean().optional(),
      comments: z.boolean().optional(),
      likes: z.boolean().optional(),
      sessions: z.boolean().optional(),
      messages: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    role: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
    image: z.boolean().optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => LikeFindManyArgsSchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    messages: z
      .union([z.boolean(), z.lazy(() => GuestbookFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> =
  z
    .object({
      identifier: z.boolean().optional(),
      token: z.boolean().optional(),
      expires: z.boolean().optional(),
    })
    .strict();

// GUESTBOOK
//------------------------------------------------------

export const GuestbookIncludeSchema: z.ZodType<Prisma.GuestbookInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const GuestbookArgsSchema: z.ZodType<Prisma.GuestbookArgs> = z
  .object({
    select: z.lazy(() => GuestbookSelectSchema).optional(),
    include: z.lazy(() => GuestbookIncludeSchema).optional(),
  })
  .strict();

export const GuestbookSelectSchema: z.ZodType<Prisma.GuestbookSelect> = z
  .object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    userId: z.boolean().optional(),
    body: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z
  .object({
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const PostArgsSchema: z.ZodType<Prisma.PostArgs> = z
  .object({
    select: z.lazy(() => PostSelectSchema).optional(),
    include: z.lazy(() => PostIncludeSchema).optional(),
  })
  .strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> =
  z
    .object({
      comments: z.boolean().optional(),
    })
    .strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z
  .object({
    slug: z.boolean().optional(),
    count: z.boolean().optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z
  .object({
    parent: z.union([z.boolean(), z.lazy(() => CommentArgsSchema)]).optional(),
    replies: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => LikeFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CommentCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const CommentArgsSchema: z.ZodType<Prisma.CommentArgs> = z
  .object({
    select: z.lazy(() => CommentSelectSchema).optional(),
    include: z.lazy(() => CommentIncludeSchema).optional(),
  })
  .strict();

export const CommentCountOutputTypeArgsSchema: z.ZodType<Prisma.CommentCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => CommentCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const CommentCountOutputTypeSelectSchema: z.ZodType<Prisma.CommentCountOutputTypeSelect> =
  z
    .object({
      replies: z.boolean().optional(),
      likes: z.boolean().optional(),
    })
    .strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z
  .object({
    id: z.boolean().optional(),
    text: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    parentId: z.boolean().optional(),
    slug: z.boolean().optional(),
    parent: z.union([z.boolean(), z.lazy(() => CommentArgsSchema)]).optional(),
    replies: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => LikeFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CommentCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// LIKE
//------------------------------------------------------

export const LikeIncludeSchema: z.ZodType<Prisma.LikeInclude> = z
  .object({
    comment: z.union([z.boolean(), z.lazy(() => CommentArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const LikeArgsSchema: z.ZodType<Prisma.LikeArgs> = z
  .object({
    select: z.lazy(() => LikeSelectSchema).optional(),
    include: z.lazy(() => LikeIncludeSchema).optional(),
  })
  .strict();

export const LikeSelectSchema: z.ZodType<Prisma.LikeSelect> = z
  .object({
    userId: z.boolean().optional(),
    commentId: z.boolean().optional(),
    comment: z.union([z.boolean(), z.lazy(() => CommentArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    provider: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    refresh_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    access_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    expires_at: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    token_type: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    id_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    session_state: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
  z
    .object({
      id: z.bigint().optional(),
      provider_providerAccountId: z
        .lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
        .optional(),
    })
    .strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      provider: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    sessionToken: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expires: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      sessionToken: z.string().optional(),
    })
    .strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      sessionToken: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    role: z
      .union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
      .optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    emailVerified: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    isAdmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
    comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
    likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
    sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
    messages: z.lazy(() => GuestbookListRelationFilterSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      accounts: z
        .lazy(() => AccountOrderByRelationAggregateInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentOrderByRelationAggregateInputSchema)
        .optional(),
      likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
      sessions: z
        .lazy(() => SessionOrderByRelationAggregateInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      email: z.string().optional(),
    })
    .strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      role: z
        .union([
          z.lazy(() => EnumRoleWithAggregatesFilterSchema),
          z.lazy(() => RoleSchema),
        ])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      email: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      identifier: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> =
  z
    .object({
      token: z.string().optional(),
      identifier_token: z
        .lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
        .optional(),
    })
    .strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => VerificationTokenCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => VerificationTokenMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => VerificationTokenMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      identifier: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      token: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const GuestbookWhereInputSchema: z.ZodType<Prisma.GuestbookWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GuestbookWhereInputSchema),
          z.lazy(() => GuestbookWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GuestbookWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GuestbookWhereInputSchema),
          z.lazy(() => GuestbookWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional()
        .nullable(),
      userId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const GuestbookOrderByWithRelationInputSchema: z.ZodType<Prisma.GuestbookOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuestbookWhereUniqueInputSchema: z.ZodType<Prisma.GuestbookWhereUniqueInput> =
  z
    .object({
      id: z.bigint().optional(),
    })
    .strict();

export const GuestbookOrderByWithAggregationInputSchema: z.ZodType<Prisma.GuestbookOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => GuestbookCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => GuestbookAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => GuestbookMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => GuestbookMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => GuestbookSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const GuestbookScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GuestbookScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GuestbookScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GuestbookScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GuestbookScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GuestbookScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GuestbookScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()])
        .optional(),
      userId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      body: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    count: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
    comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  })
  .strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> =
  z
    .object({
      slug: z.lazy(() => SortOrderSchema).optional(),
      count: z.lazy(() => SortOrderSchema).optional(),
      comments: z
        .lazy(() => CommentOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> =
  z
    .object({
      slug: z.string().optional(),
    })
    .strict();

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> =
  z
    .object({
      slug: z.lazy(() => SortOrderSchema).optional(),
      count: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PostScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      slug: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      count: z
        .union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()])
        .optional(),
    })
    .strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommentWhereInputSchema),
        z.lazy(() => CommentWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentWhereInputSchema),
        z.lazy(() => CommentWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    parentId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    slug: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    parent: z
      .union([
        z.lazy(() => CommentRelationFilterSchema),
        z.lazy(() => CommentWhereInputSchema),
      ])
      .optional()
      .nullable(),
    replies: z.lazy(() => CommentListRelationFilterSchema).optional(),
    post: z
      .union([
        z.lazy(() => PostRelationFilterSchema),
        z.lazy(() => PostWhereInputSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional()
      .nullable(),
    likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  })
  .strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
      parent: z.lazy(() => CommentOrderByWithRelationInputSchema).optional(),
      replies: z
        .lazy(() => CommentOrderByRelationAggregateInputSchema)
        .optional(),
      post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
    })
    .strict();

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CommentScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      userId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      parentId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const LikeWhereInputSchema: z.ZodType<Prisma.LikeWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => LikeWhereInputSchema),
        z.lazy(() => LikeWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => LikeWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => LikeWhereInputSchema),
        z.lazy(() => LikeWhereInputSchema).array(),
      ])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    commentId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    comment: z
      .union([
        z.lazy(() => CommentRelationFilterSchema),
        z.lazy(() => CommentWhereInputSchema),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const LikeOrderByWithRelationInputSchema: z.ZodType<Prisma.LikeOrderByWithRelationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      commentId: z.lazy(() => SortOrderSchema).optional(),
      comment: z.lazy(() => CommentOrderByWithRelationInputSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const LikeWhereUniqueInputSchema: z.ZodType<Prisma.LikeWhereUniqueInput> =
  z
    .object({
      userId_commentId: z
        .lazy(() => LikeUserIdCommentIdCompoundUniqueInputSchema)
        .optional(),
    })
    .strict();

export const LikeOrderByWithAggregationInputSchema: z.ZodType<Prisma.LikeOrderByWithAggregationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      commentId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => LikeCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => LikeMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => LikeMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const LikeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LikeScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),
          z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => LikeScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),
          z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      commentId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z
  .object({
    id: z.bigint().optional(),
    type: z.string(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    token_type: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    id_token: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
  })
  .strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
  z
    .object({
      id: z.bigint().optional(),
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z
  .object({
    id: z
      .union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)])
      .optional(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema)
      .optional(),
  })
  .strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
  z
    .object({
      id: z.bigint().optional(),
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    sessionToken: z.string(),
    expires: z.coerce.date(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })
  .strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().uuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessionToken: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expires: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema)
      .optional(),
  })
  .strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    role: z.lazy(() => RoleSchema).optional(),
    name: z.string(),
    email: z.string().optional().nullable(),
    emailVerified: z.coerce.date().optional().nullable(),
    isAdmin: z.boolean().optional(),
    image: z.string().optional().nullable(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutUserInputSchema)
      .optional(),
    likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    messages: z
      .lazy(() => GuestbookCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().uuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    isAdmin: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    messages: z
      .lazy(() => GuestbookUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
    })
    .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuestbookCreateInputSchema: z.ZodType<Prisma.GuestbookCreateInput> =
  z
    .object({
      id: z.bigint().optional(),
      user: z
        .lazy(() => UserCreateNestedOneWithoutMessagesInputSchema)
        .optional(),
      body: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const GuestbookUncheckedCreateInputSchema: z.ZodType<Prisma.GuestbookUncheckedCreateInput> =
  z
    .object({
      id: z.bigint().optional(),
      userId: z.string().optional().nullable(),
      body: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const GuestbookUpdateInputSchema: z.ZodType<Prisma.GuestbookUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutMessagesNestedInputSchema)
        .optional(),
      body: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUncheckedUpdateInputSchema: z.ZodType<Prisma.GuestbookUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      body: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuestbookCreateManyInputSchema: z.ZodType<Prisma.GuestbookCreateManyInput> =
  z
    .object({
      id: z.bigint().optional(),
      userId: z.string().optional().nullable(),
      body: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const GuestbookUpdateManyMutationInputSchema: z.ZodType<Prisma.GuestbookUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GuestbookUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      body: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    slug: z.string(),
    count: z.bigint().optional(),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutPostInputSchema)
      .optional(),
  })
  .strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> =
  z
    .object({
      slug: z.string(),
      count: z.bigint().optional(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z
  .object({
    slug: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    count: z
      .union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)])
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutPostNestedInputSchema)
      .optional(),
  })
  .strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> =
  z
    .object({
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      count: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> =
  z
    .object({
      slug: z.string(),
      count: z.bigint().optional(),
    })
    .strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> =
  z
    .object({
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      count: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> =
  z
    .object({
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      count: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    text: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    parent: z
      .lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema)
      .optional(),
    replies: z
      .lazy(() => CommentCreateNestedManyWithoutParentInputSchema)
      .optional(),
    post: z
      .lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
      .optional(),
    user: z
      .lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
      .optional(),
    likes: z
      .lazy(() => LikeCreateNestedManyWithoutCommentInputSchema)
      .optional(),
  })
  .strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      parentId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
      replies: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().uuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    text: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    parent: z
      .lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema)
      .optional(),
    replies: z
      .lazy(() => CommentUpdateManyWithoutParentNestedInputSchema)
      .optional(),
    post: z
      .lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema)
      .optional(),
    user: z
      .lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema)
      .optional(),
    likes: z
      .lazy(() => LikeUpdateManyWithoutCommentNestedInputSchema)
      .optional(),
  })
  .strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      replies: z
        .lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      parentId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
    })
    .strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const LikeCreateInputSchema: z.ZodType<Prisma.LikeCreateInput> = z
  .object({
    comment: z.lazy(() => CommentCreateNestedOneWithoutLikesInputSchema),
    user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema),
  })
  .strict();

export const LikeUncheckedCreateInputSchema: z.ZodType<Prisma.LikeUncheckedCreateInput> =
  z
    .object({
      userId: z.string(),
      commentId: z.string(),
    })
    .strict();

export const LikeUpdateInputSchema: z.ZodType<Prisma.LikeUpdateInput> = z
  .object({
    comment: z
      .lazy(() => CommentUpdateOneRequiredWithoutLikesNestedInputSchema)
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema)
      .optional(),
  })
  .strict();

export const LikeUncheckedUpdateInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      commentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LikeCreateManyInputSchema: z.ZodType<Prisma.LikeCreateManyInput> =
  z
    .object({
      userId: z.string(),
      commentId: z.string(),
    })
    .strict();

export const LikeUpdateManyMutationInputSchema: z.ZodType<Prisma.LikeUpdateManyMutationInput> =
  z.object({}).strict();

export const LikeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      commentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z
      .union([z.bigint(), z.lazy(() => NestedBigIntFilterSchema)])
      .optional(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z
      .lazy(() => UserWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => UserWhereInputSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> =
  z
    .object({
      provider: z.string(),
      providerAccountId: z.string(),
    })
    .strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> =
  z
    .object({
      equals: z.bigint().optional(),
      in: z.bigint().array().optional(),
      notIn: z.bigint().array().optional(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([
          z.bigint(),
          z.lazy(() => NestedBigIntWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
      _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z
  .object({
    equals: z.lazy(() => RoleSchema).optional(),
    in: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AccountWhereInputSchema).optional(),
      some: z.lazy(() => AccountWhereInputSchema).optional(),
      none: z.lazy(() => AccountWhereInputSchema).optional(),
    })
    .strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> =
  z
    .object({
      every: z.lazy(() => CommentWhereInputSchema).optional(),
      some: z.lazy(() => CommentWhereInputSchema).optional(),
      none: z.lazy(() => CommentWhereInputSchema).optional(),
    })
    .strict();

export const LikeListRelationFilterSchema: z.ZodType<Prisma.LikeListRelationFilter> =
  z
    .object({
      every: z.lazy(() => LikeWhereInputSchema).optional(),
      some: z.lazy(() => LikeWhereInputSchema).optional(),
      none: z.lazy(() => LikeWhereInputSchema).optional(),
    })
    .strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> =
  z
    .object({
      every: z.lazy(() => SessionWhereInputSchema).optional(),
      some: z.lazy(() => SessionWhereInputSchema).optional(),
      none: z.lazy(() => SessionWhereInputSchema).optional(),
    })
    .strict();

export const GuestbookListRelationFilterSchema: z.ZodType<Prisma.GuestbookListRelationFilter> =
  z
    .object({
      every: z.lazy(() => GuestbookWhereInputSchema).optional(),
      some: z.lazy(() => GuestbookWhereInputSchema).optional(),
      none: z.lazy(() => GuestbookWhereInputSchema).optional(),
    })
    .strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LikeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LikeOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuestbookOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GuestbookOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
    })
    .strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuestbookCountOrderByAggregateInputSchema: z.ZodType<Prisma.GuestbookCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuestbookAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GuestbookAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuestbookMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GuestbookMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuestbookMinOrderByAggregateInputSchema: z.ZodType<Prisma.GuestbookMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuestbookSumOrderByAggregateInputSchema: z.ZodType<Prisma.GuestbookSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> =
  z
    .object({
      slug: z.lazy(() => SortOrderSchema).optional(),
      count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> =
  z
    .object({
      count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> =
  z
    .object({
      slug: z.lazy(() => SortOrderSchema).optional(),
      count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> =
  z
    .object({
      slug: z.lazy(() => SortOrderSchema).optional(),
      count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostSumOrderByAggregateInputSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> =
  z
    .object({
      count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CommentRelationFilterSchema: z.ZodType<Prisma.CommentRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => CommentWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => CommentWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z
  .object({
    is: z
      .lazy(() => PostWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => PostWhereInputSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LikeUserIdCommentIdCompoundUniqueInputSchema: z.ZodType<Prisma.LikeUserIdCommentIdCompoundUniqueInput> =
  z
    .object({
      userId: z.string(),
      commentId: z.string(),
    })
    .strict();

export const LikeCountOrderByAggregateInputSchema: z.ZodType<Prisma.LikeCountOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      commentId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LikeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMaxOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      commentId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LikeMinOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMinOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      commentId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.bigint().optional(),
      increment: z.bigint().optional(),
      decrement: z.bigint().optional(),
      multiply: z.bigint().optional(),
      divide: z.bigint().optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutUserInputSchema),
          z.lazy(() => CommentCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LikeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutUserInputSchema),
          z.lazy(() => LikeCreateWithoutUserInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GuestbookCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GuestbookCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuestbookCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateWithoutUserInputSchema).array(),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GuestbookCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutUserInputSchema),
          z.lazy(() => CommentCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LikeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutUserInputSchema),
          z.lazy(() => LikeCreateWithoutUserInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GuestbookUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuestbookCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateWithoutUserInputSchema).array(),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GuestbookCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => RoleSchema).optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutUserInputSchema),
          z.lazy(() => CommentCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LikeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutUserInputSchema),
          z.lazy(() => LikeCreateWithoutUserInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => LikeScalarWhereInputSchema),
          z.lazy(() => LikeScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GuestbookUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuestbookCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateWithoutUserInputSchema).array(),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GuestbookUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GuestbookUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GuestbookCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GuestbookUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GuestbookUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GuestbookUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => GuestbookUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GuestbookScalarWhereInputSchema),
          z.lazy(() => GuestbookScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutUserInputSchema),
          z.lazy(() => CommentCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LikeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutUserInputSchema),
          z.lazy(() => LikeCreateWithoutUserInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => LikeScalarWhereInputSchema),
          z.lazy(() => LikeScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GuestbookUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuestbookCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateWithoutUserInputSchema).array(),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => GuestbookCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GuestbookUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GuestbookUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GuestbookCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GuestbookWhereUniqueInputSchema),
          z.lazy(() => GuestbookWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GuestbookUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GuestbookUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GuestbookUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => GuestbookUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GuestbookScalarWhereInputSchema),
          z.lazy(() => GuestbookScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMessagesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutMessagesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutMessagesInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserUpdateOneWithoutMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutMessagesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutMessagesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutMessagesInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutMessagesInputSchema).optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutMessagesInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutMessagesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CommentCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutPostInputSchema),
          z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutPostInputSchema),
          z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutPostNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutPostInputSchema),
          z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutPostInputSchema),
          z.lazy(() => CommentCreateWithoutPostInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyPostInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentCreateNestedOneWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutRepliesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutRepliesInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CommentCreateOrConnectWithoutRepliesInputSchema)
        .optional(),
      connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
    })
    .strict();

export const CommentCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutParentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutParentInputSchema),
          z.lazy(() => CommentCreateWithoutParentInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyParentInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutCommentsInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PostCreateOrConnectWithoutCommentsInputSchema)
        .optional(),
      connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutCommentsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutCommentsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const LikeCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutCommentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutCommentInputSchema),
          z.lazy(() => LikeCreateWithoutCommentInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyCommentInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutParentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutParentInputSchema),
          z.lazy(() => CommentCreateWithoutParentInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyParentInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LikeUncheckedCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutCommentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutCommentInputSchema),
          z.lazy(() => LikeCreateWithoutCommentInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyCommentInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUpdateOneWithoutRepliesNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneWithoutRepliesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutRepliesInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CommentCreateOrConnectWithoutRepliesInputSchema)
        .optional(),
      upsert: z.lazy(() => CommentUpsertWithoutRepliesInputSchema).optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithoutRepliesInputSchema),
          z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CommentUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutParentNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutParentInputSchema),
          z.lazy(() => CommentCreateWithoutParentInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyParentInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateOneWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneWithoutCommentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutCommentsInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PostCreateOrConnectWithoutCommentsInputSchema)
        .optional(),
      upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithoutCommentsInputSchema),
          z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutCommentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutCommentsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutCommentsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutCommentsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LikeUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutCommentNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutCommentInputSchema),
          z.lazy(() => LikeCreateWithoutCommentInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => LikeUpsertWithWhereUniqueWithoutCommentInputSchema),
          z
            .lazy(() => LikeUpsertWithWhereUniqueWithoutCommentInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyCommentInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => LikeUpdateWithWhereUniqueWithoutCommentInputSchema),
          z
            .lazy(() => LikeUpdateWithWhereUniqueWithoutCommentInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => LikeUpdateManyWithWhereWithoutCommentInputSchema),
          z
            .lazy(() => LikeUpdateManyWithWhereWithoutCommentInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => LikeScalarWhereInputSchema),
          z.lazy(() => LikeScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutParentInputSchema),
          z.lazy(() => CommentCreateWithoutParentInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyParentInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LikeUncheckedUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutCommentNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LikeCreateWithoutCommentInputSchema),
          z.lazy(() => LikeCreateWithoutCommentInputSchema).array(),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema),
          z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema),
          z.lazy(() => LikeCreateOrConnectWithoutCommentInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => LikeUpsertWithWhereUniqueWithoutCommentInputSchema),
          z
            .lazy(() => LikeUpsertWithWhereUniqueWithoutCommentInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LikeCreateManyCommentInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LikeWhereUniqueInputSchema),
          z.lazy(() => LikeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => LikeUpdateWithWhereUniqueWithoutCommentInputSchema),
          z
            .lazy(() => LikeUpdateWithWhereUniqueWithoutCommentInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => LikeUpdateManyWithWhereWithoutCommentInputSchema),
          z
            .lazy(() => LikeUpdateManyWithWhereWithoutCommentInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => LikeScalarWhereInputSchema),
          z.lazy(() => LikeScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutLikesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutLikesInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CommentCreateOrConnectWithoutLikesInputSchema)
        .optional(),
      connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLikesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutLikesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutLikesInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const CommentUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneRequiredWithoutLikesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutLikesInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CommentCreateOrConnectWithoutLikesInputSchema)
        .optional(),
      upsert: z.lazy(() => CommentUpsertWithoutLikesInputSchema).optional(),
      connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithoutLikesInputSchema),
          z.lazy(() => CommentUncheckedUpdateWithoutLikesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLikesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutLikesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutLikesInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutLikesInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutLikesInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z
      .union([z.bigint(), z.lazy(() => NestedBigIntFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> =
  z
    .object({
      equals: z.bigint().optional(),
      in: z.bigint().array().optional(),
      notIn: z.bigint().array().optional(),
      lt: z.bigint().optional(),
      lte: z.bigint().optional(),
      gt: z.bigint().optional(),
      gte: z.bigint().optional(),
      not: z
        .union([
          z.bigint(),
          z.lazy(() => NestedBigIntWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
      _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      comments: z
        .lazy(() => CommentCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      comments: z
        .lazy(() => CommentUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
  z
    .object({
      id: z.bigint().optional(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.bigint().optional(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.lazy(() => AccountCreateManyUserInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CommentCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      parent: z
        .lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema)
        .optional(),
      replies: z
        .lazy(() => CommentCreateNestedManyWithoutParentInputSchema)
        .optional(),
      post: z
        .lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      parentId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
      replies: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommentCreateWithoutUserInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const CommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.lazy(() => CommentCreateManyUserInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const LikeCreateWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateWithoutUserInput> =
  z
    .object({
      comment: z.lazy(() => CommentCreateNestedOneWithoutLikesInputSchema),
    })
    .strict();

export const LikeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutUserInput> =
  z
    .object({
      commentId: z.string(),
    })
    .strict();

export const LikeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => LikeWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => LikeCreateWithoutUserInputSchema),
        z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const LikeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.lazy(() => LikeCreateManyUserInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.lazy(() => SessionCreateManyUserInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GuestbookCreateWithoutUserInputSchema: z.ZodType<Prisma.GuestbookCreateWithoutUserInput> =
  z
    .object({
      id: z.bigint().optional(),
      body: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const GuestbookUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.GuestbookUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.bigint().optional(),
      body: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const GuestbookCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.GuestbookCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GuestbookWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GuestbookCreateWithoutUserInputSchema),
        z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GuestbookCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.GuestbookCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.lazy(() => GuestbookCreateManyUserInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateManyMutationInputSchema),
        z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema),
      ]),
    })
    .strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      provider: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      access_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      expires_at: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      token_type: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      scope: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      id_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      session_state: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const CommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => CommentUpdateWithoutUserInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentCreateWithoutUserInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateWithoutUserInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommentScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateManyMutationInputSchema),
        z.lazy(() => CommentUncheckedUpdateManyWithoutCommentsInputSchema),
      ]),
    })
    .strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CommentScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      parentId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      slug: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const LikeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => LikeWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => LikeUpdateWithoutUserInputSchema),
        z.lazy(() => LikeUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => LikeCreateWithoutUserInputSchema),
        z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const LikeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => LikeWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => LikeUpdateWithoutUserInputSchema),
        z.lazy(() => LikeUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const LikeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => LikeScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => LikeUpdateManyMutationInputSchema),
        z.lazy(() => LikeUncheckedUpdateManyWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const LikeScalarWhereInputSchema: z.ZodType<Prisma.LikeScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => LikeScalarWhereInputSchema),
          z.lazy(() => LikeScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => LikeScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => LikeScalarWhereInputSchema),
          z.lazy(() => LikeScalarWhereInputSchema).array(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      commentId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateManyMutationInputSchema),
        z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema),
      ]),
    })
    .strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      sessionToken: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const GuestbookUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GuestbookUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GuestbookWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => GuestbookUpdateWithoutUserInputSchema),
        z.lazy(() => GuestbookUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GuestbookCreateWithoutUserInputSchema),
        z.lazy(() => GuestbookUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GuestbookUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GuestbookUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GuestbookWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => GuestbookUpdateWithoutUserInputSchema),
        z.lazy(() => GuestbookUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GuestbookUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.GuestbookUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GuestbookScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => GuestbookUpdateManyMutationInputSchema),
        z.lazy(() => GuestbookUncheckedUpdateManyWithoutMessagesInputSchema),
      ]),
    })
    .strict();

export const GuestbookScalarWhereInputSchema: z.ZodType<Prisma.GuestbookScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GuestbookScalarWhereInputSchema),
          z.lazy(() => GuestbookScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GuestbookScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GuestbookScalarWhereInputSchema),
          z.lazy(() => GuestbookScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
      userId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const UserCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutMessagesInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMessagesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutMessagesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutMessagesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutMessagesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutMessagesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutMessagesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithoutMessagesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateWithoutPostInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      parent: z
        .lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema)
        .optional(),
      replies: z
        .lazy(() => CommentCreateNestedManyWithoutParentInputSchema)
        .optional(),
      user: z
        .lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      parentId: z.string().optional().nullable(),
      replies: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommentCreateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const CommentCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyPostInputEnvelope> =
  z
    .object({
      data: z.lazy(() => CommentCreateManyPostInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CommentUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => CommentUpdateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentCreateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateWithoutPostInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => CommentScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateManyMutationInputSchema),
        z.lazy(() => CommentUncheckedUpdateManyWithoutCommentsInputSchema),
      ]),
    })
    .strict();

export const CommentCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateWithoutRepliesInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      parent: z
        .lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema)
        .optional(),
      post: z
        .lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
      user: z
        .lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutRepliesInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      parentId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateOrConnectWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRepliesInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommentCreateWithoutRepliesInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema),
      ]),
    })
    .strict();

export const CommentCreateWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateWithoutParentInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      replies: z
        .lazy(() => CommentCreateNestedManyWithoutParentInputSchema)
        .optional(),
      post: z
        .lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
      user: z
        .lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutParentInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
      replies: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutCommentInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommentCreateWithoutParentInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),
      ]),
    })
    .strict();

export const CommentCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyParentInputEnvelope> =
  z
    .object({
      data: z.lazy(() => CommentCreateManyParentInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> =
  z
    .object({
      slug: z.string(),
      count: z.bigint().optional(),
    })
    .strict();

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> =
  z
    .object({
      slug: z.string(),
      count: z.bigint().optional(),
    })
    .strict();

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutCommentsInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutCommentsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
      ]),
    })
    .strict();

export const LikeCreateWithoutCommentInputSchema: z.ZodType<Prisma.LikeCreateWithoutCommentInput> =
  z
    .object({
      user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema),
    })
    .strict();

export const LikeUncheckedCreateWithoutCommentInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutCommentInput> =
  z
    .object({
      userId: z.string(),
    })
    .strict();

export const LikeCreateOrConnectWithoutCommentInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutCommentInput> =
  z
    .object({
      where: z.lazy(() => LikeWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => LikeCreateWithoutCommentInputSchema),
        z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema),
      ]),
    })
    .strict();

export const LikeCreateManyCommentInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyCommentInputEnvelope> =
  z
    .object({
      data: z.lazy(() => LikeCreateManyCommentInputSchema).array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CommentUpsertWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUpsertWithoutRepliesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => CommentUpdateWithoutRepliesInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentCreateWithoutRepliesInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUpdateWithoutRepliesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent: z
        .lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema)
        .optional(),
      post: z
        .lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutRepliesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => CommentUpdateWithoutParentInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutParentInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentCreateWithoutParentInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateWithoutParentInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutParentInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => CommentScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateManyMutationInputSchema),
        z.lazy(() => CommentUncheckedUpdateManyWithoutRepliesInputSchema),
      ]),
    })
    .strict();

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => PostUpdateWithoutCommentsInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutCommentsInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema),
      ]),
    })
    .strict();

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> =
  z
    .object({
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      count: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> =
  z
    .object({
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      count: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutCommentsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutCommentsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const LikeUpsertWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutCommentInput> =
  z
    .object({
      where: z.lazy(() => LikeWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => LikeUpdateWithoutCommentInputSchema),
        z.lazy(() => LikeUncheckedUpdateWithoutCommentInputSchema),
      ]),
      create: z.union([
        z.lazy(() => LikeCreateWithoutCommentInputSchema),
        z.lazy(() => LikeUncheckedCreateWithoutCommentInputSchema),
      ]),
    })
    .strict();

export const LikeUpdateWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutCommentInput> =
  z
    .object({
      where: z.lazy(() => LikeWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => LikeUpdateWithoutCommentInputSchema),
        z.lazy(() => LikeUncheckedUpdateWithoutCommentInputSchema),
      ]),
    })
    .strict();

export const LikeUpdateManyWithWhereWithoutCommentInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutCommentInput> =
  z
    .object({
      where: z.lazy(() => LikeScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => LikeUpdateManyMutationInputSchema),
        z.lazy(() => LikeUncheckedUpdateManyWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const CommentCreateWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      parent: z
        .lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema)
        .optional(),
      replies: z
        .lazy(() => CommentCreateNestedManyWithoutParentInputSchema)
        .optional(),
      post: z
        .lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
      user: z
        .lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      parentId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
      replies: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommentCreateWithoutLikesInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      name: z.string(),
      email: z.string().optional().nullable(),
      emailVerified: z.coerce.date().optional().nullable(),
      isAdmin: z.boolean().optional(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutLikesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const CommentUpsertWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpsertWithoutLikesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => CommentUpdateWithoutLikesInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutLikesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentCreateWithoutLikesInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const CommentUpdateWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent: z
        .lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema)
        .optional(),
      replies: z
        .lazy(() => CommentUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      post: z
        .lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      replies: z
        .lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUpsertWithoutLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutLikesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutLikesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutLikesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      messages: z
        .lazy(() => GuestbookUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
  z
    .object({
      id: z.bigint().optional(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const CommentCreateManyUserInputSchema: z.ZodType<Prisma.CommentCreateManyUserInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      parentId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
    })
    .strict();

export const LikeCreateManyUserInputSchema: z.ZodType<Prisma.LikeCreateManyUserInput> =
  z
    .object({
      commentId: z.string(),
    })
    .strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const GuestbookCreateManyUserInputSchema: z.ZodType<Prisma.GuestbookCreateManyUserInput> =
  z
    .object({
      id: z.bigint().uuid().optional(),
      body: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const CommentUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent: z
        .lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema)
        .optional(),
      replies: z
        .lazy(() => CommentUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      post: z
        .lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      replies: z
        .lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateManyWithoutCommentsInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutCommentsInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const LikeUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateWithoutUserInput> =
  z
    .object({
      comment: z
        .lazy(() => CommentUpdateOneRequiredWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const LikeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutUserInput> =
  z
    .object({
      commentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LikeUncheckedUpdateManyWithoutLikesInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutLikesInput> =
  z
    .object({
      commentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUpdateWithoutUserInputSchema: z.ZodType<Prisma.GuestbookUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.GuestbookUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuestbookUncheckedUpdateManyWithoutMessagesInputSchema: z.ZodType<Prisma.GuestbookUncheckedUpdateManyWithoutMessagesInput> =
  z
    .object({
      id: z
        .union([
          z.bigint(),
          z.lazy(() => BigIntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CommentCreateManyPostInputSchema: z.ZodType<Prisma.CommentCreateManyPostInput> =
  z
    .object({
      id: z.string().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      parentId: z.string().optional().nullable(),
    })
    .strict();

export const CommentUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithoutPostInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent: z
        .lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema)
        .optional(),
      replies: z
        .lazy(() => CommentUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      replies: z
        .lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentCreateManyParentInputSchema: z.ZodType<Prisma.CommentCreateManyParentInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      slug: z.string().optional().nullable(),
    })
    .strict();

export const LikeCreateManyCommentInputSchema: z.ZodType<Prisma.LikeCreateManyCommentInput> =
  z
    .object({
      userId: z.string(),
    })
    .strict();

export const CommentUpdateWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateWithoutParentInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replies: z
        .lazy(() => CommentUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      post: z
        .lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutParentInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      replies: z
        .lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => LikeUncheckedUpdateManyWithoutCommentNestedInputSchema)
        .optional(),
    })
    .strict();

export const CommentUncheckedUpdateManyWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutRepliesInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const LikeUpdateWithoutCommentInputSchema: z.ZodType<Prisma.LikeUpdateWithoutCommentInput> =
  z
    .object({
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const LikeUncheckedUpdateWithoutCommentInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutCommentInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: AccountScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: AccountScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: AccountScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputSchema.array(),
        AccountOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: SessionScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: SessionScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: SessionScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([
        SessionOrderByWithAggregationInputSchema.array(),
        SessionOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: UserScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: UserScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: UserScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithAggregationInputSchema.array(),
          VerificationTokenOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VerificationTokenScalarFieldEnumSchema.array(),
      having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const GuestbookFindFirstArgsSchema: z.ZodType<Prisma.GuestbookFindFirstArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      where: GuestbookWhereInputSchema.optional(),
      orderBy: z
        .union([
          GuestbookOrderByWithRelationInputSchema.array(),
          GuestbookOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GuestbookWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: GuestbookScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const GuestbookFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GuestbookFindFirstOrThrowArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      where: GuestbookWhereInputSchema.optional(),
      orderBy: z
        .union([
          GuestbookOrderByWithRelationInputSchema.array(),
          GuestbookOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GuestbookWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: GuestbookScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const GuestbookFindManyArgsSchema: z.ZodType<Prisma.GuestbookFindManyArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      where: GuestbookWhereInputSchema.optional(),
      orderBy: z
        .union([
          GuestbookOrderByWithRelationInputSchema.array(),
          GuestbookOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GuestbookWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: GuestbookScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const GuestbookAggregateArgsSchema: z.ZodType<Prisma.GuestbookAggregateArgs> =
  z
    .object({
      where: GuestbookWhereInputSchema.optional(),
      orderBy: z
        .union([
          GuestbookOrderByWithRelationInputSchema.array(),
          GuestbookOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GuestbookWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const GuestbookGroupByArgsSchema: z.ZodType<Prisma.GuestbookGroupByArgs> =
  z
    .object({
      where: GuestbookWhereInputSchema.optional(),
      orderBy: z
        .union([
          GuestbookOrderByWithAggregationInputSchema.array(),
          GuestbookOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: GuestbookScalarFieldEnumSchema.array(),
      having: GuestbookScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const GuestbookFindUniqueArgsSchema: z.ZodType<Prisma.GuestbookFindUniqueArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      where: GuestbookWhereUniqueInputSchema,
    })
    .strict();

export const GuestbookFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GuestbookFindUniqueOrThrowArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      where: GuestbookWhereUniqueInputSchema,
    })
    .strict();

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: PostScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      include: PostIncludeSchema.optional(),
      where: PostWhereInputSchema.optional(),
      orderBy: z
        .union([
          PostOrderByWithRelationInputSchema.array(),
          PostOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PostWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: PostScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: PostScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithAggregationInputSchema.array(),
        PostOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: PostScalarFieldEnumSchema.array(),
    having: PostScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      include: PostIncludeSchema.optional(),
      where: PostWhereUniqueInputSchema,
    })
    .strict();

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: CommentScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: CommentScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: CommentScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> =
  z
    .object({
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z
  .object({
    where: CommentWhereInputSchema.optional(),
    orderBy: z
      .union([
        CommentOrderByWithAggregationInputSchema.array(),
        CommentOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: CommentScalarFieldEnumSchema.array(),
    having: CommentScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereUniqueInputSchema,
    })
    .strict();

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereUniqueInputSchema,
    })
    .strict();

export const LikeFindFirstArgsSchema: z.ZodType<Prisma.LikeFindFirstArgs> = z
  .object({
    select: LikeSelectSchema.optional(),
    include: LikeIncludeSchema.optional(),
    where: LikeWhereInputSchema.optional(),
    orderBy: z
      .union([
        LikeOrderByWithRelationInputSchema.array(),
        LikeOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: LikeWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: LikeScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const LikeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LikeFindFirstOrThrowArgs> =
  z
    .object({
      select: LikeSelectSchema.optional(),
      include: LikeIncludeSchema.optional(),
      where: LikeWhereInputSchema.optional(),
      orderBy: z
        .union([
          LikeOrderByWithRelationInputSchema.array(),
          LikeOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: LikeWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: LikeScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const LikeFindManyArgsSchema: z.ZodType<Prisma.LikeFindManyArgs> = z
  .object({
    select: LikeSelectSchema.optional(),
    include: LikeIncludeSchema.optional(),
    where: LikeWhereInputSchema.optional(),
    orderBy: z
      .union([
        LikeOrderByWithRelationInputSchema.array(),
        LikeOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: LikeWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: LikeScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const LikeAggregateArgsSchema: z.ZodType<Prisma.LikeAggregateArgs> = z
  .object({
    where: LikeWhereInputSchema.optional(),
    orderBy: z
      .union([
        LikeOrderByWithRelationInputSchema.array(),
        LikeOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: LikeWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const LikeGroupByArgsSchema: z.ZodType<Prisma.LikeGroupByArgs> = z
  .object({
    where: LikeWhereInputSchema.optional(),
    orderBy: z
      .union([
        LikeOrderByWithAggregationInputSchema.array(),
        LikeOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: LikeScalarFieldEnumSchema.array(),
    having: LikeScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const LikeFindUniqueArgsSchema: z.ZodType<Prisma.LikeFindUniqueArgs> = z
  .object({
    select: LikeSelectSchema.optional(),
    include: LikeIncludeSchema.optional(),
    where: LikeWhereUniqueInputSchema,
  })
  .strict();

export const LikeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LikeFindUniqueOrThrowArgs> =
  z
    .object({
      select: LikeSelectSchema.optional(),
      include: LikeIncludeSchema.optional(),
      where: LikeWhereUniqueInputSchema,
    })
    .strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
    create: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    update: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: AccountCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> =
  z
    .object({
      data: SessionCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
    })
    .strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: UserCreateManyInputSchema.array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      data: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
      create: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> =
  z
    .object({
      data: VerificationTokenCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      data: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenUpdateManyMutationInputSchema,
        VerificationTokenUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict();

export const GuestbookCreateArgsSchema: z.ZodType<Prisma.GuestbookCreateArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      data: z.union([
        GuestbookCreateInputSchema,
        GuestbookUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const GuestbookUpsertArgsSchema: z.ZodType<Prisma.GuestbookUpsertArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      where: GuestbookWhereUniqueInputSchema,
      create: z.union([
        GuestbookCreateInputSchema,
        GuestbookUncheckedCreateInputSchema,
      ]),
      update: z.union([
        GuestbookUpdateInputSchema,
        GuestbookUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const GuestbookCreateManyArgsSchema: z.ZodType<Prisma.GuestbookCreateManyArgs> =
  z
    .object({
      data: GuestbookCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GuestbookDeleteArgsSchema: z.ZodType<Prisma.GuestbookDeleteArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      where: GuestbookWhereUniqueInputSchema,
    })
    .strict();

export const GuestbookUpdateArgsSchema: z.ZodType<Prisma.GuestbookUpdateArgs> =
  z
    .object({
      select: GuestbookSelectSchema.optional(),
      include: GuestbookIncludeSchema.optional(),
      data: z.union([
        GuestbookUpdateInputSchema,
        GuestbookUncheckedUpdateInputSchema,
      ]),
      where: GuestbookWhereUniqueInputSchema,
    })
    .strict();

export const GuestbookUpdateManyArgsSchema: z.ZodType<Prisma.GuestbookUpdateManyArgs> =
  z
    .object({
      data: z.union([
        GuestbookUpdateManyMutationInputSchema,
        GuestbookUncheckedUpdateManyInputSchema,
      ]),
      where: GuestbookWhereInputSchema.optional(),
    })
    .strict();

export const GuestbookDeleteManyArgsSchema: z.ZodType<Prisma.GuestbookDeleteManyArgs> =
  z
    .object({
      where: GuestbookWhereInputSchema.optional(),
    })
    .strict();

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    data: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
  })
  .strict();

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
    create: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
    update: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
  })
  .strict();

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z
  .object({
    data: PostCreateManyInputSchema.array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    data: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z
  .object({
    data: z.union([
      PostUpdateManyMutationInputSchema,
      PostUncheckedUpdateManyInputSchema,
    ]),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    data: z.union([
      CommentCreateInputSchema,
      CommentUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    where: CommentWhereUniqueInputSchema,
    create: z.union([
      CommentCreateInputSchema,
      CommentUncheckedCreateInputSchema,
    ]),
    update: z.union([
      CommentUpdateInputSchema,
      CommentUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> =
  z
    .object({
      data: CommentCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    where: CommentWhereUniqueInputSchema,
  })
  .strict();

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    data: z.union([
      CommentUpdateInputSchema,
      CommentUncheckedUpdateInputSchema,
    ]),
    where: CommentWhereUniqueInputSchema,
  })
  .strict();

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CommentUpdateManyMutationInputSchema,
        CommentUncheckedUpdateManyInputSchema,
      ]),
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> =
  z
    .object({
      where: CommentWhereInputSchema.optional(),
    })
    .strict();

export const LikeCreateArgsSchema: z.ZodType<Prisma.LikeCreateArgs> = z
  .object({
    select: LikeSelectSchema.optional(),
    include: LikeIncludeSchema.optional(),
    data: z.union([LikeCreateInputSchema, LikeUncheckedCreateInputSchema]),
  })
  .strict();

export const LikeUpsertArgsSchema: z.ZodType<Prisma.LikeUpsertArgs> = z
  .object({
    select: LikeSelectSchema.optional(),
    include: LikeIncludeSchema.optional(),
    where: LikeWhereUniqueInputSchema,
    create: z.union([LikeCreateInputSchema, LikeUncheckedCreateInputSchema]),
    update: z.union([LikeUpdateInputSchema, LikeUncheckedUpdateInputSchema]),
  })
  .strict();

export const LikeCreateManyArgsSchema: z.ZodType<Prisma.LikeCreateManyArgs> = z
  .object({
    data: LikeCreateManyInputSchema.array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const LikeDeleteArgsSchema: z.ZodType<Prisma.LikeDeleteArgs> = z
  .object({
    select: LikeSelectSchema.optional(),
    include: LikeIncludeSchema.optional(),
    where: LikeWhereUniqueInputSchema,
  })
  .strict();

export const LikeUpdateArgsSchema: z.ZodType<Prisma.LikeUpdateArgs> = z
  .object({
    select: LikeSelectSchema.optional(),
    include: LikeIncludeSchema.optional(),
    data: z.union([LikeUpdateInputSchema, LikeUncheckedUpdateInputSchema]),
    where: LikeWhereUniqueInputSchema,
  })
  .strict();

export const LikeUpdateManyArgsSchema: z.ZodType<Prisma.LikeUpdateManyArgs> = z
  .object({
    data: z.union([
      LikeUpdateManyMutationInputSchema,
      LikeUncheckedUpdateManyInputSchema,
    ]),
    where: LikeWhereInputSchema.optional(),
  })
  .strict();

export const LikeDeleteManyArgsSchema: z.ZodType<Prisma.LikeDeleteManyArgs> = z
  .object({
    where: LikeWhereInputSchema.optional(),
  })
  .strict();
