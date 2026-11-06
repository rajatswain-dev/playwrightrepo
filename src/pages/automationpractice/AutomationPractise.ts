import { BasePage } from "../BasePage";
import { Page, Locator, expect } from "@playwright/test";


export class AutomationPractise extends BasePage {
    readonly pageheader: Locator;
    readonly firstName: Locator;
    readonly emailFields: Locator;
    readonly phoneField: Locator;
    readonly phoneField1: Locator;
    readonly maleRedio: Locator;
    readonly sundayCheckBox: Locator;
    readonly dropDown: Locator;
    readonly multiSelect: Locator
    readonly fileupload: Locator
    readonly multipulFileUpload: Locator
    readonly pointMe: Locator
    readonly copyText: Locator
    readonly dragable: Locator
    readonly dropable: Locator
    readonly simpleAlert: Locator
    readonly conformationAlert:Locator
    readonly promptAlert:Locator
    readonly newTab:Locator
    readonly childSearch:Locator
    readonly newwindow:Locator
    readonly moreInfoLink:Locator
    readonly automationText:Locator

    constructor(page: Page) {
        super(page)
        this.pageheader = page.getByText('Swag Labs');
        this.firstName = page.getByPlaceholder('Enter Name');
        this.emailFields = page.getByRole("textbox", { "name": "Enter EMail" })
        this.phoneField = page.locator('//input[@class="form-control"]').nth(2)
        this.phoneField1 = page.locator('#phone')
        this.maleRedio = page.locator("[id='male']")
        this.sundayCheckBox = page.locator("#sunday");
        this.dropDown = page.locator("#country");
        this.multiSelect = page.locator('#colors');
        this.fileupload = page.locator("#singleFileInput")
        this.multipulFileUpload = page.locator("#multipleFilesInput");
        this.pointMe = page.getByText("Point Me")
        this.copyText = page.getByRole("button", { name: "Copy Text" })
        this.dragable = page.locator('#draggable')
        this.dropable = page.locator('#droppable');
        this.simpleAlert = page.locator('#alertBtn');
        this.conformationAlert=page.getByText("Confirmation Alert");
        this.promptAlert=page.getByText("Prompt Alert");
        this.newTab=page.getByText("New Tab");
        this.childSearch=page.locator("//input[@title='search' and @name='q']");
        this.newwindow=page.locator("#PopUp");
        this.moreInfoLink=page.getByText("Visit Conference Website for more information!")
        this.automationText=page.locator('h1[class="title"]')



    }
    async enterNameUsingFill(name: string) {
        await this.firstName.fill(name);
    }
    async enterEmail(email: string) {
        await this.emailFields.fill(email);
    }
    async enterNameUsingType(name: string) {
        await this.firstName.type(name);

    }
    async clickRedioBtm() {
        await this.maleRedio.click()
    }
    async checkSunday() {
        await this.sundayCheckBox.check();
    }
    async uncheckSunday() {
        await this.sundayCheckBox.uncheck();
    }
    async selectDropdownOption(country: string) {
        await this.dropDown.selectOption(country);
    }
    async selectDropdownValue(country: string) {
        await this.dropDown.selectOption({ label: country });
    }
    async selectDropdownByIndex(indexnumber: number) {
        await this.dropDown.selectOption({ index: indexnumber })
    }
    async multiSelectDropdown(values: string[]) {
        await this.multiSelect.selectOption(values)
    }
    async multiSelectDropdownByOption(values: string[]) {
        await this.multiSelect.selectOption(values.map(v => ({ value: v })));
    }
    async multiSelectDropdownByIndex(values: number[]) {
        await this.multiSelect.selectOption(values.map(v => ({ index: v })));
    }
    async scroll() {
        await this.dropDown.scrollIntoViewIfNeeded();
    }
    async singleFileUpload(path: string) {
        await this.fileupload.scrollIntoViewIfNeeded();
        await this.fileupload.setInputFiles(path)
    }
    async selectMultipulFileAndUpload(value: string[]) {
        this.multipulFileUpload.setInputFiles(value);
    }
    async mouseHoverOnPointMe() {
        this.pointMe.hover();
    }
    async doubleClickCopyText() {
        this.copyText.dblclick()
    }

    async rightClickOnCopyText() {
        this.copyText.click({ button: "right" })
    }
    async clickCountOnCopyText(count: number) {
        this.copyText.click({ clickCount: count })
    }
    async dragAndDropElement() {
        await this.page.locator("#draggable").scrollIntoViewIfNeeded()
        await this.page.dragAndDrop("#draggable", "#droppable");
    }
    async dragAndDropElement1() {
        await this.dropDown.scrollIntoViewIfNeeded()
        await this.dragable.dragTo(this.dropable);
    }
    async copyPesteTheValue(name: string) {
        await this.firstName.fill(name);
        await this.page.keyboard.press("Control+A");
        await this.page.keyboard.press("Control+C");
        await this.page.keyboard.press("Tab");
        await this.page.keyboard.press("Control+V");
    }
    async arrowDown() {
        await this.page.keyboard.press("arrowdown")
    }
    async arrowUp() {
        await this.page.keyboard.press("arrowup")

    }
    async alertText(): Promise<string | null> {
        return   await this.simpleAlert.textContent();
    }
    async clickOnSimplealert(): Promise<void> {
        await  this.simpleAlert.click();
    }
    async clickOnconformationAlert():Promise<void>{
        await this.conformationAlert.click();
    }
    async clickOnPromptAlert():Promise<void>{
        await this.promptAlert.click();
    }
    async clickOnNewTab():Promise<void>
    {
        await this.newTab.click()
    }
    
    enterTextInChildSearchBox(text:string){
        this.childSearch.fill(text)
    }
    clickOnNewwindow(){
        this.newwindow.click();
    }
    async clickOnMoreInfoLink(){
      await  this.moreInfoLink.click();
    }
    async automationTextContent():Promise<string | null>{
      return   await this.automationText.textContent()
    }
    async verifyTextContentOnWeb(){
        await expect(this.automationText).toHaveText('Automation Testing Practice')
    }


}