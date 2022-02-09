var gulp = require('gulp');
var jsonConcat = require('gulp-json-concat');
//const ghPages = require('gulp-gh-pages');

gulp.task('default1', function (done) {
  console.log('Hello Gulp!');
   
  gulp.src('**/glossary/*.json')
        .pipe(jsonConcat('glossary.json'))
            .pipe(gulp.dest('./'));//{
            
            //var newData = [];
            
            //for (d in data) {                           
            //    newData.push({version: data[d].header.meta.version,
            //        description: data[d].header.meta.description,
            //        projectType: data[d].header.meta.projectType,
            //        name: data[d].header.meta.name
            //    });
            //}
            
            //return new Buffer(JSON.stringify(newData));
            
        //}))
        //))
        //.pipe(gulp.dest('./'));
    
    done();
});

gulp.task('default', function (done) {
  console.log('Hello Gulp!');
  //return gulp.src('glossary/**/*.json')
  gulp.src('glossary/**/*.json')
    .pipe(jsonConcat('glossary.json',function(data){
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest('./'));
  console.log('Hello start ghPages!');
  //gulp.src('./dist/**/*.json').pipe(ghPages());
  console.log('Hello done!');
  done()
});


//gulp.task('deploy', () => src('./dist/**/*.json').pipe(ghPages()));

// npm install --save-dev gulp-json-concat
// https://github.com/thedaviddias/gulp-json-concat
// https://criticaldevelopers.com/blog/post/install-and-execute-gulp-in-visual-studio-code-vscode-on-windows
// https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async