declare class JSONRpcClientException extends Error {
  code: string;
  constructor(code: string, message: string);
  toString(): string;
}

declare class JSONRpcClient {
  /**
   * @param params
   */
  constructor(params: {
    url: string;
    headers?: { [key: string]: string };
    onerror?: (error: JSONRpcClientException) => void;
    onsuccess?: (result: any, id: number, methodName: string) => void;
    onstart?: () => void;
  });

  getToken(companyLogin: string, apiKey: string): Promise<string>;

  setOptions(options: any): void;

  getParam(key: string, defaultValue?: any): any;

  getEventList();

  getLocationsList();

  getUnitList();

  getReservedTime();

  getStartTimeMatrix(
    dateFrom: string,
    dateTo: string,
    serviceId: string,
    performerId: string[],
    count: number,
  );

  getAvailableTimeIntervals(
    dateFrom: string,
    dateTo: string,
    serviceId: string,
    performerId: string[],
    count?: number,
  );

  getWorkCalendar();

  getFirstWorkingDay(value: string | null);

  getAdditionalFields(eventID: string);

  book(
    serviceId: string,
    performerId: string,
    date: string,
    startTime: string,
    clientData: { [key in string]: string },
    additionalFieldValues: { [key in string]: string },
    count: number,
  );
}
