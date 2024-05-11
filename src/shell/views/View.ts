import { LitElement } from "lit";

export abstract class View extends LitElement
{
  public createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}