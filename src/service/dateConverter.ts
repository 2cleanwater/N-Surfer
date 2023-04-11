interface dateConverterForm{
  date?:Date;
  dateString?:string;
  tag:string;
}

export const dateConverter = (dateInput:dateConverterForm) => {
  let year:string = "0000";
  let month:string = "00";
  let day:string = "00";
  if(dateInput.date){
    year = dateInput.date.getFullYear().toString();
    month = (dateInput.date.getMonth() + 1).toString().padStart(2, '0');
    day = dateInput.date.getDate().toString().padStart(2, '0');
  }
  else if(dateInput.dateString){
    if(dateInput.dateString.length===8){
      year = dateInput.dateString.slice(0, 4);
      month = dateInput.dateString.slice(4, 6);
      day = dateInput.dateString.slice(6, 8);
    }
    else{
      const date = new Date(dateInput.dateString);
      year = String(date.getUTCFullYear());
      month = String(date.getUTCMonth() + 1).padStart(2, '0');
      day = String(date.getUTCDate()).padStart(2, '0');
    }
  }
  switch(dateInput.tag){
    case "korean": return year+"년 " + month+"월 " + day+"일";
    case "-": return year+"-" + month+"-" + day;
    case "": return year+ month+ day;
    case ".": return year+"."+month+"."+day;
    default: return year+ month+ day;
  }
}
