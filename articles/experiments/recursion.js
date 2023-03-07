// DP CS Exam 2023

function doThis(n) {

  if (n === 0) {
    return;
  }

  console.log(n);
  doThis(n-1);
  console.log(n);
}

doThis(3);
// 3 2 1 1 2 3