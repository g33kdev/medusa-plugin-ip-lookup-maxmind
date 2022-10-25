import { AddressNotFoundError } from "@maxmind/geoip2-node/dist/src/errors";
import IpLookupService from "../../src/services/ip-lookup";
import medusaMiddleware from "../../src/api/medusa-middleware";

const service = new IpLookupService(
  {},
  {
    maxmind_db_path: "data/dbip-country-lite-2022-06.mmdb",
  }
);

describe("medusaMiddleware.preCartCreation()", () => {
  test("skips if req.body.region_id is passed in", async () => {
    const req = {
      body: {
        region_id: "a",
      },
    };

    await medusaMiddleware.preCartCreation(req, {}, () => {});

    expect(req.body.region_id).toBe("a");
  });

  test("req.body.region_id and req.body.country_code are set", async () => {
    const countryRepo = {
      findOne: jest.fn(),
    };
    const managerMock = {
      getCustomRepository: (repo) => countryRepo,
    };
    const req = {
      scope: {
        resolve: (serviceName) => {
          if (serviceName == "ipLookupService") {
            return service;
          }
          return managerMock;
        },
      },
      connection: {
        remoteAddress: "45.55.27.15",
      },
      headers: {},
      body: {
        region_id: undefined,
        country_code: undefined,
      },
    };

    countryRepo.findOne.mockReturnValue({
      region_id: "reg_1",
      iso_2: "US",
    });

    await medusaMiddleware.preCartCreation(req, {}, () => {});

    expect(req.body.region_id).toBe("reg_1");
    expect(req.body.country_code).toBe("US");
    expect(countryRepo.findOne).toBeCalledWith({
      where: { iso_2: "us" },
    });
  });
});
