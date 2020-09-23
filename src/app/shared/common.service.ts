import { Injectable } from '@angular/core';
import * as converter from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  XMLtoJson(xml, isTable = false) {
    let result1 = converter.xml2json(xml, { compact: false, spaces: 2 });
    const JSONData = JSON.parse(result1);
    console.log({ JSONData });
    const responseData = !isTable ? JSON.parse(converter.xml2json(JSONData.elements[0].elements[0].text, { compact: true, spaces: 2 })) :
      this.xmlTableToJson(JSONData);
    return responseData;
  }

  xmlTableToJson(data) {
    console.log({ data });
    return data;
  }


  // xmlToJsonOrderData(data) {
  //   let result1 = converter.xml2json(data, { compact: false, spaces: 2 });
  //   const JSONData = JSON.parse(result1);
  //   console.log('order data function =>', { JSONData });
  //   // console.log('JSONData.elements[0].elements[0].text => ', JSONData.elements[0].elements[0].text);
  //   console.log('converter.xml2json(JSONData.elements[0].elements[0].text, { compact: true, spaces: 2 }) => ',
  //     converter.xml2json(JSONData.elements[0].elements[0].text, { compact: false, spaces: 2 }));
  //   // const responseData = JSON.parse(converter.xml2json(JSONData.elements[0].elements[0].text, { compact: true, spaces: 2 }));
  //   // console.log('responseData :: order data => ', responseData);
  //   // return responseData;
  // }
}
