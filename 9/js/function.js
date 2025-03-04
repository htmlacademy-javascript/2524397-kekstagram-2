// Функция для проверки длины строки.
function validateLengthFirst (anyString, maxLength) {
  return anyString.length <= maxLength;
}

const validateLengthSecond = (anyString, maxLength) => anyString.length <= maxLength;

validateLengthFirst('проверяемая строка', 20);
validateLengthSecond('проверяемая строка', 18);
//console.log(validateLengthSecond('проверяемая строка', 10));


// Функция для проверки, является ли строка палиндромом.
function isPalindrom (anyString) {
  const nonSpaceString = anyString.replaceAll(' ','');
  let reverseString = '';

  for (let i = 1; i <= nonSpaceString.length; i++){
    reverseString += nonSpaceString.at(-i);
  }

  return nonSpaceString.toLowerCase() === reverseString.toLowerCase();
}

isPalindrom('топот');
//console.log(isPalindrom('ДовОд'));
//console.log(isPalindrom('Кекс'));
//console.log(isPalindrom('Лёша на полке клопа нашёл '));


//Функция извлекающая цифры из строки и вовращающая их в виде положительного целого числа.
function getNumber(anyString) {
  let numbersAtString = '';

  for (let i = 0; i < anyString.length; i++){
    if (Number(anyString[i]) === Number(anyString[i])) {
      numbersAtString += anyString[i];
    }
  }

  numbersAtString = numbersAtString.replaceAll(' ','');

  if (numbersAtString){
    return Math.round(numbersAtString);
  } else {
    return 'NaN';
  }
}

getNumber('2023 год');
//console.log(getNumber('ECMAScript 2022'));
//console.log(getNumber('1 кефир, 0.5 батона'));
//console.log(getNumber('агент 007'));
//console.log(getNumber('а я томат'));

//console.log(getNumber('2023'));
//console.log(getNumber('-1'));
//console.log(getNumber('1.5'));

const strokeTimeToMinutes = (timeInArray) => timeInArray[0] * 60 + Number(timeInArray[1]);

const meetingIsReally = (workingTimeStart, workingTimeEnd, meetingTimeStart, meetingDuration) => {
  const workingTimeStartInMinutes = strokeTimeToMinutes(workingTimeStart.split(':'));
  const workingTimeEndInMinutes = strokeTimeToMinutes(workingTimeEnd.split(':'));
  const meetingTimeStartInMinutes = strokeTimeToMinutes(meetingTimeStart.split(':'));

  if (workingTimeStartInMinutes <= meetingTimeStartInMinutes && workingTimeEndInMinutes >= (meetingTimeStartInMinutes + meetingDuration)) {
    return true;
  }
  return false;
};

meetingIsReally('08:00', '17:30', '14:00', 90);

// console.log(meetingIsReally('08:00', '17:30', '14:00', 90)); // true
// console.log(meetingIsReally('8:0', '10:0', '8:0', 120));     // true
// console.log(meetingIsReally('08:00', '14:30', '14:00', 90)); // false
// console.log(meetingIsReally('14:00', '17:30', '08:0', 90));  // false
// console.log(meetingIsReally('8:00', '17:30', '08:00', 900)); // false
