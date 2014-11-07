# DWM Development Testing

Testing typography and deployment solutions for the new Digital Web Media website.

---

## Install instructions

Install Jekyll with `sudo gem install jekyll`.

Set up Gulp with `npm install`.

Run `gulp` to do work.

---

## Post Hooks

To enable "post-commit" hook (to automatically copy "master" branch to "gh-pages" branch):

Remember to run `chmod a+x .git/hooks/post-commit` to make the "post-commit" file executable.

Add the following to "post-commit":
    #!/bin/sh
    git checkout gh-pages
    git rebase master
    git checkout master