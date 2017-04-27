Blissful Epidemic Lottery
=======

This is the site which is used to track and operate the weekly Blissful Epidemic lottery.

Details to come later, maybe.

## Deployment

Follow steps on https://github.com/jeeeyul/meteor-openshift

1. `cd blislottery`, the meteor app itself.

2. Run `meteor build path/to/your/openshift-appname --directory --server-only`

3. `cd path/to/your/openshift-appname`

4. `git add --all && git commit -m "deploy" && git push`

## TODO:

- [ ] Clean up text/titles from lottery to a more generally approachable site
- [ ] Track un-signed-in users via cookies for the purpose of raid sign-ups
- [ ] Move business logic from application.js onto the server, to prevent potential tampering
- [ ] Better UI
- [ ] More raid features?
  - [ ] Class build links
  - [ ] Class icons
- [ ] User profile features
  - [ ] Store characters to sign up for raids
  - [ ] UI/permissions
- Route helpers to enforce resource permissions

