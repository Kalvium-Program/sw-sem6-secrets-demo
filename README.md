# Secrets demo: one secret, one service

Two services. Only `app` is granted the dummy token. `app.js` reads it from a file and logs `credentialLoaded: true`, never the value. This is a teaching demo, not a real login system.

## Before class

```bash
git clone https://github.com/Kalvium-Program/sw-sem6-secrets-demo.git
cd sw-sem6-secrets-demo
mkdir -p secrets
printf 'DUMMY_ONLY_NOT_A_CREDENTIAL\n' > secrets/demo_token.txt
chmod 700 secrets && chmod 600 secrets/demo_token.txt
docker compose -p secdemo config --quiet
```

## Run and check

```bash
git check-ignore secrets/demo_token.txt
git ls-files secrets/
docker compose -p secdemo up -d
docker compose -p secdemo logs app
docker inspect secdemo-app-1 --format '{{json .Config.Env}}'
docker compose -p secdemo exec -T app node -e "console.log(require('fs').existsSync('/run/secrets/demo_token'))"
docker compose -p secdemo exec -T observer node -e "console.log(require('fs').existsSync('/run/secrets/demo_token'))"
```

Expected: the file is ignored and untracked, the log shows `credentialLoaded: true`, the environment shows only the path, `true` for app and `false` for observer.

## Clean up

```bash
docker compose -p secdemo down
```

Never use a real token. Never `cat` the secret file in class.
