import type { RequestClientOptions } from '@goodlook11/companion-client'
import type {
  IndexedObject,
  PluginTarget,
  UIPlugin,
  UIPluginOptions,
} from '@goodlook11/core'
import UrlLocale from './generatedLocale'

export interface UrlOptions extends UIPluginOptions, RequestClientOptions {
  target?: PluginTarget
  title?: string
  locale?: UrlLocale
}

declare class Url extends UIPlugin<UrlOptions> {
  public addFile(
    url: string,
    meta?: IndexedObject<any>,
  ): undefined | string | never
}

export default Url
