import { LitElement, TemplateResult, html, nothing } from "lit";
import { XArchive } from "../../models/XArchive";
import { XArchiveEntry } from "../../models/XArchiveEntry";
import { XArchiveEntryFragments } from "./XArchiveEntryFragments";

export class XArchiveFragments
{
  public static ListingFragment(model?: XArchive): TemplateResult {
    return html`
      <div class="row">
        <div class="col">
          ${model ?
              model.entries.map((entry: XArchiveEntry) => XArchiveEntryFragments.ListingFragment(entry, model.entries.indexOf(entry)))
            :
              nothing
          }
        </div>
      </div>
    `
  }
}