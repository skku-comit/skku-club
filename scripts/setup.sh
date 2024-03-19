#!/usr/bin/env bash
set -eu

# skip if CI orVERCEL env is set
if [ -n "${CI-}" ] || [ -n "${VERCEL-}" ]; then
  echo "CI or VERCEL env is set, skipping setup"
  exit 0
fi


vc env pull .env
