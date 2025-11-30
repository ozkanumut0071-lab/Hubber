$branch = "Ardaw"

git checkout main
git pull origin main
git checkout $branch
git merge origin/main