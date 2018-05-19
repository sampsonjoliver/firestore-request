export type IntitialiseParams = {
  rootCollection: string;
};

export var globalParams: IntitialiseParams = {
  rootCollection: 'requests'
};

export function initialiseApp(params: IntitialiseParams) {
  globalParams = params;
}
