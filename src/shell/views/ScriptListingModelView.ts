import { TemplateResult, html } from "lit";
import { XArchiveFile } from "../../models/XArchiveFile";
import { ModelView } from "./ModelView";
import { customElement, state } from "lit/decorators.js";

@customElement("script-listing-modelview")
export class ScriptListingModelView extends ModelView<XArchiveFile>
{
  private _model?: XArchiveFile;

  public override get Model(): XArchiveFile | undefined {
    return this._model;
  }

  public override set Model(model: XArchiveFile) {
    this._model = model;
    this.requestUpdate();
  }

  protected override render(): TemplateResult {
    return this.Model ?
      html`
        <div>
          <h2>
            Model ${this.Model.offsetPatchListOffset} ${this.Model.indexPatchListOffset} ${this.Model.soundCount}
          </h2>
        </div>
      ` 
    : 
      html`
        <div class="d-flex justify-content-center">
          <strong>No file selected</strong>
        </div>
      `;
  }
}