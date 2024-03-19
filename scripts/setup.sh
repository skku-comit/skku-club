#!/usr/bin/env bash
set -eu

# skip if VERCEL env is set
if [ -n "${VERCEL_ENV}" ]; then
  echo "VERCEL_ENV is set, skipping setup"
  exit 0
fi

vc env pull .env
