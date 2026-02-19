declare module 'meteor/mdg:validated-method' {
  export type ValidateFn<TArgs = any> = ((args: TArgs) => void) | null;

  export interface ValidatedMethodOptions<TArgs = any, TResult = any> {
    name: string;
    validate: ValidateFn<TArgs>;
    run(this: { userId: string | null }, args: TArgs): TResult | Promise<TResult>;
  }

  export class ValidatedMethod<TArgs = any, TResult = any> {
    name: string;
    validate: ValidateFn<TArgs>;
    run: (args: TArgs) => TResult | Promise<TResult>;

    constructor(options: ValidatedMethodOptions<TArgs, TResult>);

    call(
      args?: TArgs,
      callback?: (error: Error | null, result?: TResult) => void
    ): void;

    callPromise(args?: TArgs): Promise<TResult>;

    _execute(context: { userId: string | null }, args: TArgs): TResult | Promise<TResult>;
  }
}
