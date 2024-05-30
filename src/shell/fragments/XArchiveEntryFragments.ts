import { TemplateResult, html } from "lit";
import { XArchiveEntry } from "../../models/XArchiveEntry";
import { XArchiveFileType } from "../../enums/XArchiveFileType";
import { ImporterView } from "../views/ImporterView";

export class XArchiveEntryFragments
{
  public static ListingFragment(model: XArchiveEntry, index: number): TemplateResult
  {
    return html`
      <div class="row">
        <button type="button" class="btn btn-outline-dark m-1" @click="${
          async (e: Event) => document.querySelector<ImporterView>("#importer")?.SetScriptListingModel(model.file)
        }">
          ${XArchiveFileType[model.fileType]} ${index}
        </button>
      </div>
    `;
  }
}