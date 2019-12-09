/// <reference path="Index.ts"/>
namespace Elements{

  export class SheetElement implements SheetElementInterface{
    public elements: SheetElementsMapInterface
    public positions = {} as SheetElementPositionsInterface
    public isVisible: string
    public color: string
    public delimiter: string = "_"
    public typeOfName: ExcelSheetNameType
    private _excelSheetName: string
    public id: string
    private _regExpNumeration: RegExp = /(.\d_\d.)/g
    constructor(
      {
        id, name, isVisible, color,
        typeOfName, positionFirst, positionSecond,
        delimiter, elements,
      }: SheetElementConstructorInterface
    ) {
      this.id = id
      this.name = name
      this._excelSheetName = name
      this.isVisible = isVisible
      this.color =color
      this.typeOfName = typeOfName
      this.positions.firstNumber = positionFirst === undefined? 0 : positionFirst
      this.positions.secondNumber = positionSecond === undefined? 0 : positionSecond
      this.delimiter = delimiter === undefined? this.delimiter : delimiter
      this.elements = elements === undefined? new Map() as SheetElementsMapInterface : elements
    }

    public set name(value: string){
      try {
        this[this.typeOfName] = value
      } catch (error) {
        
      }
    }
    public get name(): string{
      try {
        const name: string = this[this.typeOfName]
        return name
      } catch (error) {
        return ""
      }
    }

    private set _decodedName(value: string) {
      try {
        this._excelSheetName = value
      } catch (error) {
        this._excelSheetName = ""
      }
    }
    private get _decodedName(): string {
      try {
        const sentence = this._excelSheetName
        const cleanSentence: string = sentence.replace(this._regExpNumeration, "")
        return cleanSentence
      } catch (error) {
        return ""
      }
    }
    private set _encodedName(value: string) {
      try {
        const readyPattern: string = this._numerationPattern()
        this._excelSheetName = value + readyPattern
      } catch (error) {
        this._excelSheetName =''
      }
    }
    /** 1. extract possible pattern -> 00_00 but it can be e0_0uio,
     * so it is necessary to clean up after match and separate to two numbers
     * 2. to clean up pattern 0_0 and all numbers in name
     * 3. create new name 
     */
    private get _encodedName(): string {
      try {
        const cleanSentence: string = this._decodedName
        const readyPattern: string = this._numerationPattern()

        return cleanSentence + readyPattern
      } catch (error) {
        return  ""
      }
    }
    private _numerationPattern(): string {
      try {
        function returnPart(draftValue: number): string{
          return draftValue > 9 ? String(draftValue) : "0" + String(draftValue)
        }
        const firstPart: string = returnPart(this.positions.firstNumber)
        const secondPart: string = returnPart(this.positions.secondNumber)
        const readyPattern: string = firstPart + this.delimiter + secondPart

        return readyPattern
      
      } catch (error) {
        return ""
      }
    }
    private _doesNameIncludesNumerationPattern(): boolean {
      try {
        const result = this._excelSheetName.match(this._regExpNumeration)
        if(Array.isArray(result) && result.length>0) return true
        return false
      } catch (error) {
        console.log("_doesNameIncludesNumerationPattern", error)
        return false
      }
    }
  }
  export const SheetElementConfig = {
    typeOfName: {
      originalName: "_excelSheetName", 
      simpleName: "_decodedName",
      numeratedName: "_encodedName",
    }
  }
}