import { LitElement, TemplateResult, css, html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from 'lit/decorators.js'
import { View } from './View';
import { XArchive } from '../../models/XArchive';
import { XArchiveFragments } from '../fragments/XArchiveFragment';
import { ModelView } from './ModelView';
import { BinaryReader } from '../../util/BinaryReader';
import { ScriptListingModelView } from './ScriptListingModelView';
import { Model } from '../../models/Model';

@customElement('importer-view')
export class ImporterView extends View
{
  static cardStyle = css`max-height: 95vh`;

  private _scriptListing: ModelView<unknown> = new ScriptListingModelView;

  @state()
  protected _archive?: XArchive;

  public get Archive(): XArchive | undefined {
    return this._archive;
  }

  public set Archive(archive: XArchive) {
    this._archive = archive;
  }

  public SetScriptListingModel(model?: Model): void {
    console.log("[ImporterView] Setting model for script listing");
    this._scriptListing.Model = model;
  }

  private _loadArchive(event: Event): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let file = (this.querySelector("#archive-input") as any).files[0];
      let reader = new FileReader();

      reader.onload = (event) => {
        let binaryReader = new BinaryReader(event.target?.result as ArrayBuffer);
        this._archive?.Release();
        let split = file.name.split('.');
        let extension = split[split.length - 1];
        this.Archive = XArchive.ReadFrom(extension, 0, binaryReader);
        this.requestUpdate();
        resolve();
      }
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="row rounded border border-dark m-4 shadow overflow-auto" style="${ImporterView.cardStyle}">
        <div class="col border-bottom border-dark">
          <div class="input-group p-2">
            <input type="file" class="form-control border-dark" id="archive-input" aria-describedby="archive-input-label" aria-label="Upload">
            <button class="btn btn-outline-dark" type="button" id="archive-input-label" @click="${this._loadArchive}">Load Archive</button>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            ${XArchiveFragments.ListingFragment(this._archive)}
          </div>
          <div class="col">
            ${this._scriptListing}
          </div>
        </div>
      </div>
    `;
  }
}