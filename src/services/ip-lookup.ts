import { BaseService } from "medusa-interfaces";
import { Reader, ReaderModel } from "@maxmind/geoip2-node";

type IpLookupServiceOptions = {
  maxmind_db_path: string;
};

class IpLookupService extends BaseService {
  options_: IpLookupServiceOptions;
  reader_: ReaderModel;

  constructor({}, options) {
    super();
    this.options_ = options;
  }

  async lookupIp(ipAddress) {
    if (!this.reader_) {
      this.reader_ = await Reader.open(this.options_["maxmind_db_path"]);
    }

    return this.reader_.country(ipAddress);
  }
}

export default IpLookupService;
