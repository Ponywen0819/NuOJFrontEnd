export const quickSort = (arr, compare) => {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i], pivot)) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [
    ...quickSort(leftArr, compare),
    pivot,
    ...quickSort(rightArr, compare),
  ];
};
