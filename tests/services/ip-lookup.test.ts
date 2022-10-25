import { AddressNotFoundError } from "@maxmind/geoip2-node/dist/src/errors";
import IpLookupService from "../../src/services/ip-lookup";

const service = new IpLookupService(
  {},
  {
    maxmind_db_path: "data/dbip-country-lite-2022-06.mmdb",
  }
);

describe("lookupIp", () => {
  test("finds correct country", async () => {
    const data = await service.lookupIp("45.55.27.15");
    expect(data.country.isoCode).toBe("US");
  });

  test("throws exception on unknown IP", async () => {
    await expect(service.lookupIp("::1")).rejects.toThrow(AddressNotFoundError);
    await expect(service.lookupIp("127.0.0.1")).rejects.toThrow(
      AddressNotFoundError
    );
  });
});
