/// <reference path="../index.d.ts"/>

namespace MatrixElementInterface {
	export type outsideApp = 'browser' | 'excelDesktop'
	export type sheetsSource = Excel.Worksheet[] | any[]
	export type ClassTitle = 'Basic' | 'MatrixElement'
	export interface Basic extends SheetElementsInterface.Basic {}
	export interface Positions extends SheetElementsInterface.Positions {}
	export interface BasicConstructor
		extends SheetElementsInterface.BasicConstructor {}
	export type NameType = '_excelSheetName' | '_decodedName' | '_encodedName'
	export type SheetVisibility =
		| Excel.SheetVisibility
		| 'Visible'
		| 'Hidden'
		| 'VeryHidden'
	export interface MatrixElement extends Basic {
		sourceId: string
		id: string
		name: string
		visibility: SheetVisibility
		color: string
		elements: MatrixElement[]
		positions: Positions
		_doesNameIncludesNumerationPattern(): boolean
		decodedName: string
		encodedName: string
		_numerationPattern():string
	}
	export interface MatrixElementConstructor extends BasicConstructor {
		id: string
		name: string
		visibility: SheetVisibility
		color: string
		elements: []
		first: number
		second: number
	}
	export interface MEMap extends Map<MatrixElement['id'], MatrixElement> {}
	export interface MEArr extends Array<MatrixElement> {}
	export interface getPositionsAndSortOptions {
		oldArr: MEArr
		requereToCorrectType: boolean
		typeOfName: NameType
	}
	export interface maintainerStatuses {
		areSheetsHaveNumeration: boolean
		isNumerationBroken: boolean
		shouldWeRestoreNumeration: boolean
		resetToDefault(): void
		default: maintainerStatuses
	}
	export interface MatrixController extends Basic {
		maintainerStatuses: maintainerStatuses
		arrElements: MEArr
		firstOpenScenarioCreateMatrixElements(
			excelSheets: sheetsSource
		): Promise<boolean>
		sheetsNumerationRepairer(): Promise<void>
		reorderSheetsBasedOnPosition({
			requereToCorrectType,
		}: {
			requereToCorrectType: boolean
		}): Promise<void>
		correctDoubles(): Promise<void>
		writeSheets(sheetsArr: MEArr): void
		getExcelSheets(): MEArr
		changeElement(el: MatrixElement): Promise<void>
		insertElement(el: MatrixElement): Promise<void>
		deleteElement(idOrName?: string, el?: MatrixElement): Promise<void>
		usualSheetChange(arr: MatrixElementInterface.MEArr): Promise<void>
		createNewSheetElement(
			id: string,
			name: string,
			first: number,
			second: number,
			tabColor: string,
			visibility: Excel.SheetVisibility
		): Promise<MatrixElement>
		_simpleSheetsLoading(
			sheets: MatrixElementInterface.sheetsSource
		): Promise<void>
		filterElements(word: string): Promise<MEArr>
	}
	export interface MatrixControllerConstructor extends BasicConstructor {
		maintainerStatuses: maintainerStatuses
	}
}
