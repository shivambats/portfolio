---
title: What I learned building a tiny deployment platform
lede: A small deployment system taught me that the useful constraints are usually product constraints, not technical ones.
---

Most deployment products begin with an impressive feature list. Mine began with a much smaller question: what should a team need to know before pressing deploy?

The answer was three things: what is being deployed, where it will run, and whether it is healthy. Everything in Relay grew from making those three answers visible.

## Start with one happy path

The first version had one command and one target. There were no environments, organization settings, or deployment templates. This did not make the system less real. It made the important work visible earlier: packaging code reliably and reporting failure clearly.

When a tool has a narrow initial path, every exception is an intentional decision instead of a default feature.

## Logs are part of the interface

Deployment logs are not an implementation detail. A developer reads them when something has already gone wrong, so the log needs to answer one question at a time.

```sh
relay deploy
# bundling application
# uploading 18.4 MB
# checking health endpoint
# deployment ready
```

The output above is deliberately brief. It describes progress, avoids internal vocabulary, and gives the next useful detail only when a step fails.

## A reliable default beats a flexible setting

The platform chooses sensible cache headers, health checks, and rollback behavior. Teams can override those defaults later, but a configuration screen should never be a prerequisite for a safe first deployment.

The work continues, but the lesson has stayed the same: use the smallest surface area that gives people confidence.
