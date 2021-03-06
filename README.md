[![codecov.io](https://codecov.io/github/Kitware/candela/coverage.svg?branch=master)](https://codecov.io/github/Kitware/candela?branch=master)

# Candela

Candela is an open-source suite of interoperable web visualization
components for [Kitware](http://www.kitware.com)'s [Resonant](http://resonant.kitware.com) platform.
Candela focuses on making scalable, rich visualizations available
with a normalized API for use in real-world data science applications.
Integrated components include:

* [LineUp](http://www.caleydo.org/tools/lineup/) dynamic ranking by the Harvard University [Visual Computing Group](http://vcg.seas.harvard.edu/) and the [Caleydo](http://www.caleydo.org/) project.
* [UpSet](http://www.caleydo.org/tools/upset/) set visualization by the Harvard University [Visual Computing Group](http://vcg.seas.harvard.edu/) and the [Caleydo](http://www.caleydo.org/) project.
* [OnSet](http://www.cc.gatech.edu/gvu/ii/setvis/) set visualization by the Georgia Institute of Technology [Information Interfaces Group](http://www.cc.gatech.edu/gvu/ii/).
* [Vega](https://vega.github.io/vega/) visualizations by the University of Washington [Interactive Data Lab](http://idl.cs.washington.edu/).

# [Documentation](src/candela#readme)

# Installation from source

## Prerequisites

* npm
* cairo (`brew install cairo` on Mac OSX).

## Build

```bash
git clone https://github.com/Kitware/candela.git
cd candela
npm install
npm run build
```

# [Resonant Laboratory application](https://github.com/Kitware/candela/blob/master/app/resonant-laboratory/README.md)

# Release Process

To perform a new release of Candela, please follow these steps. This assumes
that the code on `master` is ready to be turned into a new release (i.e., it
passes all tests and includes all new functionality desired for the new
release). In this example, we will pretend that the new release version number
will be 1.2.0.

1. Create a new release branch, named `release-1.2.0`:

   ```shell
   git checkout -b release-1.2.0 master
   ```

2. Bump the version number to 1.2.0 by editing `package.json`. Make a commit
   with the commit message "Bump version number for release" and push the
   branch:

   ```shell
   vim package.json
   git commit -am 'Bump version number for release'
   git push -u origin release-1.2.0
   ```

3. Make a new local branch to save your spot in the commit tree here. Be sure
   your checkout remains on `release-1.2.0`. You can do this with:

   ```shell
   git branch save-point
   ```

4. Build the distribution files by using the "production" NPM script:

   ```shell
   npm run build:production
   ```

   This will create a `dist` directory containing two JavaScript files, a
   regular and a minified version.

5. Commit the production files and push again.

   ```shell
   git add dist
   git commit -m 'Add production files for release'
   git push
   ```

6. Create a pull request from the release-1.2.0 branch. *Make sure you base the
   PR against the `release` branch, not against `master`.*

7. Wait for an "LGTM" message, and then merge the pull request and delete the
   release-1.2.0 branch.

8. Check out the `release` branch, pull, tag a release, push, and then delete the
   `release-1.2.0` branch.

   ```shell
   git checkout release
   git pull
   git tag v1.2.0
   git push --tags
   git branch -d release-1.2.0
   ```

9. Publish the new package to NPM. You will need to log in with your NPM
   credentials first.

   ```shell
   npm login
   npm publish
   ```

10. Merge the `save-point` branch into `master` (do not use a fast-forward
    merge, since this is a special type of commit to prepare master for development
    with a new version number, rather than adding any new functionality), push,
    then delete `save-point`. *Be sure you are not merging `release-1.2` or
    `release` into master; we do not want the distribution files to enter the
    mainline development branch.*

    ```shell
    git checkout master
    git merge save-point
    git branch -d save-point
    git push
    ```

This concludes the release process. You will have a new, tagged release
published, with a corresponding commit on the `release` branch, while
`master` will have the package version number updated, ready for further
development.

# Testing Images

One of Candela's testing phases is *image testing*, in which images of
visualization components are created programmatically and compared to
established baseline images. These images are automatically uploaded to
[Kitware's Girder
instance](https://data.kitware.com/#folder/576845848d777f30a28d705a) where they
are catalogued by Travis build number and can be viewed by anyone.
