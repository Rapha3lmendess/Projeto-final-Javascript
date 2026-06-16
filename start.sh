#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_PORT="${BACKEND_PORT:-3000}"
FRONTEND_PORT="${FRONTEND_PORT:-8000}"

cleanup() {
  if [[ -n "${BACKEND_PID:-}" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  if [[ -n "${FRONTEND_PID:-}" ]] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

if ! command -v npm >/dev/null 2>&1; then
  echo "npm não encontrado. Instale Node.js antes de continuar." >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 não encontrado. Instale Python 3 antes de continuar." >&2
  exit 1
fi

if lsof -i ":$BACKEND_PORT" >/dev/null 2>&1; then
  echo "A porta $BACKEND_PORT já está em uso. Pare o processo atual ou altere BACKEND_PORT." >&2
  exit 1
fi

if lsof -i ":$FRONTEND_PORT" >/dev/null 2>&1; then
  echo "A porta $FRONTEND_PORT já está em uso. Pare o processo atual ou altere FRONTEND_PORT." >&2
  exit 1
fi

(
  cd "$BACKEND_DIR"
  PORT="$BACKEND_PORT" npm run dev
) &
BACKEND_PID=$!

(
  cd "$FRONTEND_DIR"
  python3 -m http.server "$FRONTEND_PORT"
) &
FRONTEND_PID=$!

echo "Backend: http://localhost:$BACKEND_PORT"
echo "Frontend: http://localhost:$FRONTEND_PORT"

wait -n "$BACKEND_PID" "$FRONTEND_PID"
