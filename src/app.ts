export type IntitialiseParams = {
  rootCollection: string;
};

export let globalParams: IntitialiseParams = {
  rootCollection: 'requests'
};

export function initialiseApp(params: IntitialiseParams) {
  globalParams = params;
}
