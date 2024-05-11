import { LitElement } from "lit";
import { IReleasable } from "../../util/IReleasable";
import { View } from "./View";

export abstract class ModelView<T> extends View
{
  public abstract get Model(): T | undefined;
  public abstract set Model(model: T);
}