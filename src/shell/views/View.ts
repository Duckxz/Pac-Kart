import { LitElement } from "lit";

export abstract class View extends LitElement
{
  public override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}