import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ContactUsPage extends BasePage {
  private readonly getInTouchHeading = this.page.getByRole("heading", {
    name: "Get In Touch",
  });
  private readonly nameInput = this.page.getByTestId("name");
  private readonly emailInput = this.page.getByTestId("email");
  private readonly subjectInput = this.page.getByTestId("subject");
  private readonly messageInput = this.page.getByTestId("message");
  private readonly submitButton = this.page.getByRole("button", {
    name: "Submit",
  });
  public readonly successMessage = this.page
    .locator("#contact-page")
    .getByText("Success! Your details have been submitted successfully.", {
      exact: true,
    });
  private readonly fileUploadInput = this.page.locator('input[name="upload_file"]');
  private readonly homePageLink = this.page
    .locator("#contact-page")
    .getByRole("link", { name: /Home/ });

  constructor(page: Page) {
    super(page);
  }
  public get getInTouchHeadingLocator(): Locator {
    return this.getInTouchHeading;
  }
  public async navigate(): Promise<void> {
    await this.navigateGeneral("/contact_us");
  }

  public async fillContactUsForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.fillForm(name, email, subject, message);
    await this.uploadFile("src/test-data/test-file.pdf");
    await this.submit();
  }

  public async fillForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  public async uploadFile(filePath: string): Promise<void> {
    await this.fileUploadInput.setInputFiles(filePath);
  }

  async clickSubmitAndAcceptPopup(): Promise<string> {
    let dialogMessage = "";

    this.page.once("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await this.submit();

    return dialogMessage;
  }
  public async submit(): Promise<void> {
    await this.submitButton.click();
  }
  public async clickSubmit(): Promise<void> {
    await this.submit();
  }
  public async clickHomePageLink(): Promise<void> {
    await this.homePageLink.click();
  }
}
export default ContactUsPage;
