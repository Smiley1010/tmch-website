
BEGIN;

-- 1. Users: accounts are created through invitations.
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('admin', 'editor', 'writer')),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Invitations: store token hashes, never raw tokens.
CREATE TABLE invitations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(254) NOT NULL,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('editor', 'writer')),
    token_hash TEXT NOT NULL UNIQUE,
    invited_by BIGINT NOT NULL REFERENCES users(id),
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX invitations_email_idx ON invitations (LOWER(email));

-- 3. Articles: the current version and workflow status.
CREATE TABLE articles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    slug VARCHAR(280) NOT NULL UNIQUE,
    excerpt TEXT,
    category VARCHAR(100),
    cover_image_url TEXT,
    author_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (status IN (
            'draft', 'submitted', 'in_review',
            'changes_requested', 'approved', 'published', 'archived'
        )),
    current_version_id BIGINT,
    published_at TIMESTAMPTZ,
    published_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX articles_status_idx ON articles (status);
CREATE INDEX articles_author_idx ON articles (author_id);

-- 4. Article versions: preserve each submitted content snapshot.
CREATE TABLE article_versions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    article_id BIGINT NOT NULL
        REFERENCES articles(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL CHECK (version_number > 0),
    body TEXT NOT NULL,
    title_snapshot VARCHAR(250) NOT NULL,
    excerpt_snapshot TEXT,
    category_snapshot VARCHAR(100),
    cover_image_url_snapshot TEXT,
    content_hash CHAR(64) NOT NULL,
    created_by BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (article_id, version_number),
    UNIQUE (article_id, id)
);

ALTER TABLE articles
ADD CONSTRAINT articles_current_version_fk
FOREIGN KEY (id, current_version_id)
REFERENCES article_versions (article_id, id)
DEFERRABLE INITIALLY DEFERRED;

-- 5. Approval decisions: decisions apply to a specific version.
CREATE TABLE approval_decisions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    article_id BIGINT NOT NULL,
    version_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL REFERENCES users(id),
    decision VARCHAR(20) NOT NULL
        CHECK (decision IN ('approved', 'rejected', 'changes_requested')),
    comments TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (article_id, version_id)
        REFERENCES article_versions (article_id, id),
    UNIQUE (version_id, reviewer_id)
);

CREATE INDEX approval_article_idx
ON approval_decisions (article_id, created_at DESC);

-- 6. Audit logs: record important actions.
CREATE TABLE audit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX audit_entity_idx
ON audit_logs (entity_type, entity_id, created_at DESC);

CREATE INDEX audit_actor_idx
ON audit_logs (actor_id, created_at DESC);

COMMIT;
