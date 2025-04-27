
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AcademicQualification
 * 
 */
export type AcademicQualification = $Result.DefaultSelection<Prisma.$AcademicQualificationPayload>
/**
 * Model ProfessionalLicense
 * 
 */
export type ProfessionalLicense = $Result.DefaultSelection<Prisma.$ProfessionalLicensePayload>
/**
 * Model WorkExperience
 * 
 */
export type WorkExperience = $Result.DefaultSelection<Prisma.$WorkExperiencePayload>
/**
 * Model ProfessionalAffiliation
 * 
 */
export type ProfessionalAffiliation = $Result.DefaultSelection<Prisma.$ProfessionalAffiliationPayload>
/**
 * Model AwardRecognition
 * 
 */
export type AwardRecognition = $Result.DefaultSelection<Prisma.$AwardRecognitionPayload>
/**
 * Model ProfessionalDevelopment
 * 
 */
export type ProfessionalDevelopment = $Result.DefaultSelection<Prisma.$ProfessionalDevelopmentPayload>
/**
 * Model CommunityInvolvement
 * 
 */
export type CommunityInvolvement = $Result.DefaultSelection<Prisma.$CommunityInvolvementPayload>
/**
 * Model Publication
 * 
 */
export type Publication = $Result.DefaultSelection<Prisma.$PublicationPayload>
/**
 * Model ConferencePresentation
 * 
 */
export type ConferencePresentation = $Result.DefaultSelection<Prisma.$ConferencePresentationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  FACULTY: 'FACULTY',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ApprovalStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ApprovalStatus = $Enums.ApprovalStatus

export const ApprovalStatus: typeof $Enums.ApprovalStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicQualification`: Exposes CRUD operations for the **AcademicQualification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicQualifications
    * const academicQualifications = await prisma.academicQualification.findMany()
    * ```
    */
  get academicQualification(): Prisma.AcademicQualificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalLicense`: Exposes CRUD operations for the **ProfessionalLicense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalLicenses
    * const professionalLicenses = await prisma.professionalLicense.findMany()
    * ```
    */
  get professionalLicense(): Prisma.ProfessionalLicenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workExperience`: Exposes CRUD operations for the **WorkExperience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkExperiences
    * const workExperiences = await prisma.workExperience.findMany()
    * ```
    */
  get workExperience(): Prisma.WorkExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalAffiliation`: Exposes CRUD operations for the **ProfessionalAffiliation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalAffiliations
    * const professionalAffiliations = await prisma.professionalAffiliation.findMany()
    * ```
    */
  get professionalAffiliation(): Prisma.ProfessionalAffiliationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.awardRecognition`: Exposes CRUD operations for the **AwardRecognition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AwardRecognitions
    * const awardRecognitions = await prisma.awardRecognition.findMany()
    * ```
    */
  get awardRecognition(): Prisma.AwardRecognitionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalDevelopment`: Exposes CRUD operations for the **ProfessionalDevelopment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalDevelopments
    * const professionalDevelopments = await prisma.professionalDevelopment.findMany()
    * ```
    */
  get professionalDevelopment(): Prisma.ProfessionalDevelopmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.communityInvolvement`: Exposes CRUD operations for the **CommunityInvolvement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommunityInvolvements
    * const communityInvolvements = await prisma.communityInvolvement.findMany()
    * ```
    */
  get communityInvolvement(): Prisma.CommunityInvolvementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publication`: Exposes CRUD operations for the **Publication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Publications
    * const publications = await prisma.publication.findMany()
    * ```
    */
  get publication(): Prisma.PublicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conferencePresentation`: Exposes CRUD operations for the **ConferencePresentation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConferencePresentations
    * const conferencePresentations = await prisma.conferencePresentation.findMany()
    * ```
    */
  get conferencePresentation(): Prisma.ConferencePresentationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AcademicQualification: 'AcademicQualification',
    ProfessionalLicense: 'ProfessionalLicense',
    WorkExperience: 'WorkExperience',
    ProfessionalAffiliation: 'ProfessionalAffiliation',
    AwardRecognition: 'AwardRecognition',
    ProfessionalDevelopment: 'ProfessionalDevelopment',
    CommunityInvolvement: 'CommunityInvolvement',
    Publication: 'Publication',
    ConferencePresentation: 'ConferencePresentation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "academicQualification" | "professionalLicense" | "workExperience" | "professionalAffiliation" | "awardRecognition" | "professionalDevelopment" | "communityInvolvement" | "publication" | "conferencePresentation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AcademicQualification: {
        payload: Prisma.$AcademicQualificationPayload<ExtArgs>
        fields: Prisma.AcademicQualificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicQualificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicQualificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>
          }
          findFirst: {
            args: Prisma.AcademicQualificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicQualificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>
          }
          findMany: {
            args: Prisma.AcademicQualificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>[]
          }
          create: {
            args: Prisma.AcademicQualificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>
          }
          createMany: {
            args: Prisma.AcademicQualificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicQualificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>[]
          }
          delete: {
            args: Prisma.AcademicQualificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>
          }
          update: {
            args: Prisma.AcademicQualificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>
          }
          deleteMany: {
            args: Prisma.AcademicQualificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicQualificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicQualificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>[]
          }
          upsert: {
            args: Prisma.AcademicQualificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicQualificationPayload>
          }
          aggregate: {
            args: Prisma.AcademicQualificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicQualification>
          }
          groupBy: {
            args: Prisma.AcademicQualificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicQualificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicQualificationCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicQualificationCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalLicense: {
        payload: Prisma.$ProfessionalLicensePayload<ExtArgs>
        fields: Prisma.ProfessionalLicenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalLicenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalLicenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          findFirst: {
            args: Prisma.ProfessionalLicenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalLicenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          findMany: {
            args: Prisma.ProfessionalLicenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>[]
          }
          create: {
            args: Prisma.ProfessionalLicenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          createMany: {
            args: Prisma.ProfessionalLicenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalLicenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>[]
          }
          delete: {
            args: Prisma.ProfessionalLicenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          update: {
            args: Prisma.ProfessionalLicenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalLicenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalLicenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalLicenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalLicenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          aggregate: {
            args: Prisma.ProfessionalLicenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalLicense>
          }
          groupBy: {
            args: Prisma.ProfessionalLicenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalLicenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalLicenseCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalLicenseCountAggregateOutputType> | number
          }
        }
      }
      WorkExperience: {
        payload: Prisma.$WorkExperiencePayload<ExtArgs>
        fields: Prisma.WorkExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>
          }
          findFirst: {
            args: Prisma.WorkExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>
          }
          findMany: {
            args: Prisma.WorkExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>[]
          }
          create: {
            args: Prisma.WorkExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>
          }
          createMany: {
            args: Prisma.WorkExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>[]
          }
          delete: {
            args: Prisma.WorkExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>
          }
          update: {
            args: Prisma.WorkExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>
          }
          deleteMany: {
            args: Prisma.WorkExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>[]
          }
          upsert: {
            args: Prisma.WorkExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkExperiencePayload>
          }
          aggregate: {
            args: Prisma.WorkExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkExperience>
          }
          groupBy: {
            args: Prisma.WorkExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<WorkExperienceCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalAffiliation: {
        payload: Prisma.$ProfessionalAffiliationPayload<ExtArgs>
        fields: Prisma.ProfessionalAffiliationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalAffiliationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalAffiliationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalAffiliationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalAffiliationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          findMany: {
            args: Prisma.ProfessionalAffiliationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>[]
          }
          create: {
            args: Prisma.ProfessionalAffiliationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          createMany: {
            args: Prisma.ProfessionalAffiliationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalAffiliationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalAffiliationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          update: {
            args: Prisma.ProfessionalAffiliationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalAffiliationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalAffiliationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalAffiliationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalAffiliationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalAffiliationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalAffiliation>
          }
          groupBy: {
            args: Prisma.ProfessionalAffiliationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalAffiliationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalAffiliationCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalAffiliationCountAggregateOutputType> | number
          }
        }
      }
      AwardRecognition: {
        payload: Prisma.$AwardRecognitionPayload<ExtArgs>
        fields: Prisma.AwardRecognitionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AwardRecognitionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AwardRecognitionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>
          }
          findFirst: {
            args: Prisma.AwardRecognitionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AwardRecognitionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>
          }
          findMany: {
            args: Prisma.AwardRecognitionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>[]
          }
          create: {
            args: Prisma.AwardRecognitionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>
          }
          createMany: {
            args: Prisma.AwardRecognitionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AwardRecognitionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>[]
          }
          delete: {
            args: Prisma.AwardRecognitionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>
          }
          update: {
            args: Prisma.AwardRecognitionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>
          }
          deleteMany: {
            args: Prisma.AwardRecognitionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AwardRecognitionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AwardRecognitionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>[]
          }
          upsert: {
            args: Prisma.AwardRecognitionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardRecognitionPayload>
          }
          aggregate: {
            args: Prisma.AwardRecognitionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAwardRecognition>
          }
          groupBy: {
            args: Prisma.AwardRecognitionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AwardRecognitionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AwardRecognitionCountArgs<ExtArgs>
            result: $Utils.Optional<AwardRecognitionCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalDevelopment: {
        payload: Prisma.$ProfessionalDevelopmentPayload<ExtArgs>
        fields: Prisma.ProfessionalDevelopmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalDevelopmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalDevelopmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalDevelopmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalDevelopmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>
          }
          findMany: {
            args: Prisma.ProfessionalDevelopmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>[]
          }
          create: {
            args: Prisma.ProfessionalDevelopmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>
          }
          createMany: {
            args: Prisma.ProfessionalDevelopmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalDevelopmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalDevelopmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>
          }
          update: {
            args: Prisma.ProfessionalDevelopmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalDevelopmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalDevelopmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalDevelopmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalDevelopmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalDevelopmentPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalDevelopmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalDevelopment>
          }
          groupBy: {
            args: Prisma.ProfessionalDevelopmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalDevelopmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalDevelopmentCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalDevelopmentCountAggregateOutputType> | number
          }
        }
      }
      CommunityInvolvement: {
        payload: Prisma.$CommunityInvolvementPayload<ExtArgs>
        fields: Prisma.CommunityInvolvementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommunityInvolvementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommunityInvolvementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>
          }
          findFirst: {
            args: Prisma.CommunityInvolvementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommunityInvolvementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>
          }
          findMany: {
            args: Prisma.CommunityInvolvementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>[]
          }
          create: {
            args: Prisma.CommunityInvolvementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>
          }
          createMany: {
            args: Prisma.CommunityInvolvementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommunityInvolvementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>[]
          }
          delete: {
            args: Prisma.CommunityInvolvementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>
          }
          update: {
            args: Prisma.CommunityInvolvementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>
          }
          deleteMany: {
            args: Prisma.CommunityInvolvementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommunityInvolvementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommunityInvolvementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>[]
          }
          upsert: {
            args: Prisma.CommunityInvolvementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityInvolvementPayload>
          }
          aggregate: {
            args: Prisma.CommunityInvolvementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommunityInvolvement>
          }
          groupBy: {
            args: Prisma.CommunityInvolvementGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommunityInvolvementGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommunityInvolvementCountArgs<ExtArgs>
            result: $Utils.Optional<CommunityInvolvementCountAggregateOutputType> | number
          }
        }
      }
      Publication: {
        payload: Prisma.$PublicationPayload<ExtArgs>
        fields: Prisma.PublicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findFirst: {
            args: Prisma.PublicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findMany: {
            args: Prisma.PublicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          create: {
            args: Prisma.PublicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          createMany: {
            args: Prisma.PublicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          delete: {
            args: Prisma.PublicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          update: {
            args: Prisma.PublicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          deleteMany: {
            args: Prisma.PublicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PublicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          upsert: {
            args: Prisma.PublicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          aggregate: {
            args: Prisma.PublicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublication>
          }
          groupBy: {
            args: Prisma.PublicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicationCountArgs<ExtArgs>
            result: $Utils.Optional<PublicationCountAggregateOutputType> | number
          }
        }
      }
      ConferencePresentation: {
        payload: Prisma.$ConferencePresentationPayload<ExtArgs>
        fields: Prisma.ConferencePresentationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConferencePresentationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConferencePresentationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>
          }
          findFirst: {
            args: Prisma.ConferencePresentationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConferencePresentationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>
          }
          findMany: {
            args: Prisma.ConferencePresentationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>[]
          }
          create: {
            args: Prisma.ConferencePresentationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>
          }
          createMany: {
            args: Prisma.ConferencePresentationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConferencePresentationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>[]
          }
          delete: {
            args: Prisma.ConferencePresentationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>
          }
          update: {
            args: Prisma.ConferencePresentationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>
          }
          deleteMany: {
            args: Prisma.ConferencePresentationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConferencePresentationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConferencePresentationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>[]
          }
          upsert: {
            args: Prisma.ConferencePresentationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePresentationPayload>
          }
          aggregate: {
            args: Prisma.ConferencePresentationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConferencePresentation>
          }
          groupBy: {
            args: Prisma.ConferencePresentationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConferencePresentationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConferencePresentationCountArgs<ExtArgs>
            result: $Utils.Optional<ConferencePresentationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    academicQualification?: AcademicQualificationOmit
    professionalLicense?: ProfessionalLicenseOmit
    workExperience?: WorkExperienceOmit
    professionalAffiliation?: ProfessionalAffiliationOmit
    awardRecognition?: AwardRecognitionOmit
    professionalDevelopment?: ProfessionalDevelopmentOmit
    communityInvolvement?: CommunityInvolvementOmit
    publication?: PublicationOmit
    conferencePresentation?: ConferencePresentationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    academicQualifications: number
    professionalLicenses: number
    workExperiences: number
    professionalAffiliations: number
    awardsRecognitions: number
    professionalDevelopments: number
    communityInvolvements: number
    publications: number
    conferencePresentations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicQualifications?: boolean | UserCountOutputTypeCountAcademicQualificationsArgs
    professionalLicenses?: boolean | UserCountOutputTypeCountProfessionalLicensesArgs
    workExperiences?: boolean | UserCountOutputTypeCountWorkExperiencesArgs
    professionalAffiliations?: boolean | UserCountOutputTypeCountProfessionalAffiliationsArgs
    awardsRecognitions?: boolean | UserCountOutputTypeCountAwardsRecognitionsArgs
    professionalDevelopments?: boolean | UserCountOutputTypeCountProfessionalDevelopmentsArgs
    communityInvolvements?: boolean | UserCountOutputTypeCountCommunityInvolvementsArgs
    publications?: boolean | UserCountOutputTypeCountPublicationsArgs
    conferencePresentations?: boolean | UserCountOutputTypeCountConferencePresentationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAcademicQualificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicQualificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProfessionalLicensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalLicenseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkExperienceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProfessionalAffiliationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalAffiliationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAwardsRecognitionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardRecognitionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProfessionalDevelopmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalDevelopmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommunityInvolvementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityInvolvementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPublicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConferencePresentationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConferencePresentationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    academicQualifications?: boolean | User$academicQualificationsArgs<ExtArgs>
    professionalLicenses?: boolean | User$professionalLicensesArgs<ExtArgs>
    workExperiences?: boolean | User$workExperiencesArgs<ExtArgs>
    professionalAffiliations?: boolean | User$professionalAffiliationsArgs<ExtArgs>
    awardsRecognitions?: boolean | User$awardsRecognitionsArgs<ExtArgs>
    professionalDevelopments?: boolean | User$professionalDevelopmentsArgs<ExtArgs>
    communityInvolvements?: boolean | User$communityInvolvementsArgs<ExtArgs>
    publications?: boolean | User$publicationsArgs<ExtArgs>
    conferencePresentations?: boolean | User$conferencePresentationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicQualifications?: boolean | User$academicQualificationsArgs<ExtArgs>
    professionalLicenses?: boolean | User$professionalLicensesArgs<ExtArgs>
    workExperiences?: boolean | User$workExperiencesArgs<ExtArgs>
    professionalAffiliations?: boolean | User$professionalAffiliationsArgs<ExtArgs>
    awardsRecognitions?: boolean | User$awardsRecognitionsArgs<ExtArgs>
    professionalDevelopments?: boolean | User$professionalDevelopmentsArgs<ExtArgs>
    communityInvolvements?: boolean | User$communityInvolvementsArgs<ExtArgs>
    publications?: boolean | User$publicationsArgs<ExtArgs>
    conferencePresentations?: boolean | User$conferencePresentationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      academicQualifications: Prisma.$AcademicQualificationPayload<ExtArgs>[]
      professionalLicenses: Prisma.$ProfessionalLicensePayload<ExtArgs>[]
      workExperiences: Prisma.$WorkExperiencePayload<ExtArgs>[]
      professionalAffiliations: Prisma.$ProfessionalAffiliationPayload<ExtArgs>[]
      awardsRecognitions: Prisma.$AwardRecognitionPayload<ExtArgs>[]
      professionalDevelopments: Prisma.$ProfessionalDevelopmentPayload<ExtArgs>[]
      communityInvolvements: Prisma.$CommunityInvolvementPayload<ExtArgs>[]
      publications: Prisma.$PublicationPayload<ExtArgs>[]
      conferencePresentations: Prisma.$ConferencePresentationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    academicQualifications<T extends User$academicQualificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$academicQualificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    professionalLicenses<T extends User$professionalLicensesArgs<ExtArgs> = {}>(args?: Subset<T, User$professionalLicensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workExperiences<T extends User$workExperiencesArgs<ExtArgs> = {}>(args?: Subset<T, User$workExperiencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    professionalAffiliations<T extends User$professionalAffiliationsArgs<ExtArgs> = {}>(args?: Subset<T, User$professionalAffiliationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    awardsRecognitions<T extends User$awardsRecognitionsArgs<ExtArgs> = {}>(args?: Subset<T, User$awardsRecognitionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    professionalDevelopments<T extends User$professionalDevelopmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$professionalDevelopmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    communityInvolvements<T extends User$communityInvolvementsArgs<ExtArgs> = {}>(args?: Subset<T, User$communityInvolvementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    publications<T extends User$publicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$publicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conferencePresentations<T extends User$conferencePresentationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conferencePresentationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.academicQualifications
   */
  export type User$academicQualificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    where?: AcademicQualificationWhereInput
    orderBy?: AcademicQualificationOrderByWithRelationInput | AcademicQualificationOrderByWithRelationInput[]
    cursor?: AcademicQualificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademicQualificationScalarFieldEnum | AcademicQualificationScalarFieldEnum[]
  }

  /**
   * User.professionalLicenses
   */
  export type User$professionalLicensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    where?: ProfessionalLicenseWhereInput
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    cursor?: ProfessionalLicenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * User.workExperiences
   */
  export type User$workExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    where?: WorkExperienceWhereInput
    orderBy?: WorkExperienceOrderByWithRelationInput | WorkExperienceOrderByWithRelationInput[]
    cursor?: WorkExperienceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkExperienceScalarFieldEnum | WorkExperienceScalarFieldEnum[]
  }

  /**
   * User.professionalAffiliations
   */
  export type User$professionalAffiliationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    where?: ProfessionalAffiliationWhereInput
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    cursor?: ProfessionalAffiliationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * User.awardsRecognitions
   */
  export type User$awardsRecognitionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    where?: AwardRecognitionWhereInput
    orderBy?: AwardRecognitionOrderByWithRelationInput | AwardRecognitionOrderByWithRelationInput[]
    cursor?: AwardRecognitionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AwardRecognitionScalarFieldEnum | AwardRecognitionScalarFieldEnum[]
  }

  /**
   * User.professionalDevelopments
   */
  export type User$professionalDevelopmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    where?: ProfessionalDevelopmentWhereInput
    orderBy?: ProfessionalDevelopmentOrderByWithRelationInput | ProfessionalDevelopmentOrderByWithRelationInput[]
    cursor?: ProfessionalDevelopmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalDevelopmentScalarFieldEnum | ProfessionalDevelopmentScalarFieldEnum[]
  }

  /**
   * User.communityInvolvements
   */
  export type User$communityInvolvementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    where?: CommunityInvolvementWhereInput
    orderBy?: CommunityInvolvementOrderByWithRelationInput | CommunityInvolvementOrderByWithRelationInput[]
    cursor?: CommunityInvolvementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunityInvolvementScalarFieldEnum | CommunityInvolvementScalarFieldEnum[]
  }

  /**
   * User.publications
   */
  export type User$publicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    where?: PublicationWhereInput
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    cursor?: PublicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * User.conferencePresentations
   */
  export type User$conferencePresentationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    where?: ConferencePresentationWhereInput
    orderBy?: ConferencePresentationOrderByWithRelationInput | ConferencePresentationOrderByWithRelationInput[]
    cursor?: ConferencePresentationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConferencePresentationScalarFieldEnum | ConferencePresentationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AcademicQualification
   */

  export type AggregateAcademicQualification = {
    _count: AcademicQualificationCountAggregateOutputType | null
    _avg: AcademicQualificationAvgAggregateOutputType | null
    _sum: AcademicQualificationSumAggregateOutputType | null
    _min: AcademicQualificationMinAggregateOutputType | null
    _max: AcademicQualificationMaxAggregateOutputType | null
  }

  export type AcademicQualificationAvgAggregateOutputType = {
    yearCompleted: number | null
  }

  export type AcademicQualificationSumAggregateOutputType = {
    yearCompleted: number | null
  }

  export type AcademicQualificationMinAggregateOutputType = {
    id: string | null
    degree: string | null
    institution: string | null
    program: string | null
    yearCompleted: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    diplomaFileUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type AcademicQualificationMaxAggregateOutputType = {
    id: string | null
    degree: string | null
    institution: string | null
    program: string | null
    yearCompleted: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    diplomaFileUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type AcademicQualificationCountAggregateOutputType = {
    id: number
    degree: number
    institution: number
    program: number
    yearCompleted: number
    createdAt: number
    updatedAt: number
    userId: number
    diplomaFileUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type AcademicQualificationAvgAggregateInputType = {
    yearCompleted?: true
  }

  export type AcademicQualificationSumAggregateInputType = {
    yearCompleted?: true
  }

  export type AcademicQualificationMinAggregateInputType = {
    id?: true
    degree?: true
    institution?: true
    program?: true
    yearCompleted?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    diplomaFileUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type AcademicQualificationMaxAggregateInputType = {
    id?: true
    degree?: true
    institution?: true
    program?: true
    yearCompleted?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    diplomaFileUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type AcademicQualificationCountAggregateInputType = {
    id?: true
    degree?: true
    institution?: true
    program?: true
    yearCompleted?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    diplomaFileUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type AcademicQualificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicQualification to aggregate.
     */
    where?: AcademicQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicQualifications to fetch.
     */
    orderBy?: AcademicQualificationOrderByWithRelationInput | AcademicQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicQualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicQualifications
    **/
    _count?: true | AcademicQualificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicQualificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicQualificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicQualificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicQualificationMaxAggregateInputType
  }

  export type GetAcademicQualificationAggregateType<T extends AcademicQualificationAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicQualification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicQualification[P]>
      : GetScalarType<T[P], AggregateAcademicQualification[P]>
  }




  export type AcademicQualificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicQualificationWhereInput
    orderBy?: AcademicQualificationOrderByWithAggregationInput | AcademicQualificationOrderByWithAggregationInput[]
    by: AcademicQualificationScalarFieldEnum[] | AcademicQualificationScalarFieldEnum
    having?: AcademicQualificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicQualificationCountAggregateInputType | true
    _avg?: AcademicQualificationAvgAggregateInputType
    _sum?: AcademicQualificationSumAggregateInputType
    _min?: AcademicQualificationMinAggregateInputType
    _max?: AcademicQualificationMaxAggregateInputType
  }

  export type AcademicQualificationGroupByOutputType = {
    id: string
    degree: string
    institution: string
    program: string
    yearCompleted: number
    createdAt: Date
    updatedAt: Date
    userId: string
    diplomaFileUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: AcademicQualificationCountAggregateOutputType | null
    _avg: AcademicQualificationAvgAggregateOutputType | null
    _sum: AcademicQualificationSumAggregateOutputType | null
    _min: AcademicQualificationMinAggregateOutputType | null
    _max: AcademicQualificationMaxAggregateOutputType | null
  }

  type GetAcademicQualificationGroupByPayload<T extends AcademicQualificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicQualificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicQualificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicQualificationGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicQualificationGroupByOutputType[P]>
        }
      >
    >


  export type AcademicQualificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    degree?: boolean
    institution?: boolean
    program?: boolean
    yearCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    diplomaFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicQualification"]>

  export type AcademicQualificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    degree?: boolean
    institution?: boolean
    program?: boolean
    yearCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    diplomaFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicQualification"]>

  export type AcademicQualificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    degree?: boolean
    institution?: boolean
    program?: boolean
    yearCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    diplomaFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicQualification"]>

  export type AcademicQualificationSelectScalar = {
    id?: boolean
    degree?: boolean
    institution?: boolean
    program?: boolean
    yearCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    diplomaFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type AcademicQualificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "degree" | "institution" | "program" | "yearCompleted" | "createdAt" | "updatedAt" | "userId" | "diplomaFileUrl" | "status" | "rejectionReason", ExtArgs["result"]["academicQualification"]>
  export type AcademicQualificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AcademicQualificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AcademicQualificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AcademicQualificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicQualification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      degree: string
      institution: string
      program: string
      yearCompleted: number
      createdAt: Date
      updatedAt: Date
      userId: string
      diplomaFileUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["academicQualification"]>
    composites: {}
  }

  type AcademicQualificationGetPayload<S extends boolean | null | undefined | AcademicQualificationDefaultArgs> = $Result.GetResult<Prisma.$AcademicQualificationPayload, S>

  type AcademicQualificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicQualificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicQualificationCountAggregateInputType | true
    }

  export interface AcademicQualificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicQualification'], meta: { name: 'AcademicQualification' } }
    /**
     * Find zero or one AcademicQualification that matches the filter.
     * @param {AcademicQualificationFindUniqueArgs} args - Arguments to find a AcademicQualification
     * @example
     * // Get one AcademicQualification
     * const academicQualification = await prisma.academicQualification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicQualificationFindUniqueArgs>(args: SelectSubset<T, AcademicQualificationFindUniqueArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicQualification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicQualificationFindUniqueOrThrowArgs} args - Arguments to find a AcademicQualification
     * @example
     * // Get one AcademicQualification
     * const academicQualification = await prisma.academicQualification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicQualificationFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicQualificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicQualification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicQualificationFindFirstArgs} args - Arguments to find a AcademicQualification
     * @example
     * // Get one AcademicQualification
     * const academicQualification = await prisma.academicQualification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicQualificationFindFirstArgs>(args?: SelectSubset<T, AcademicQualificationFindFirstArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicQualification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicQualificationFindFirstOrThrowArgs} args - Arguments to find a AcademicQualification
     * @example
     * // Get one AcademicQualification
     * const academicQualification = await prisma.academicQualification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicQualificationFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicQualificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicQualifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicQualificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicQualifications
     * const academicQualifications = await prisma.academicQualification.findMany()
     * 
     * // Get first 10 AcademicQualifications
     * const academicQualifications = await prisma.academicQualification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicQualificationWithIdOnly = await prisma.academicQualification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicQualificationFindManyArgs>(args?: SelectSubset<T, AcademicQualificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicQualification.
     * @param {AcademicQualificationCreateArgs} args - Arguments to create a AcademicQualification.
     * @example
     * // Create one AcademicQualification
     * const AcademicQualification = await prisma.academicQualification.create({
     *   data: {
     *     // ... data to create a AcademicQualification
     *   }
     * })
     * 
     */
    create<T extends AcademicQualificationCreateArgs>(args: SelectSubset<T, AcademicQualificationCreateArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicQualifications.
     * @param {AcademicQualificationCreateManyArgs} args - Arguments to create many AcademicQualifications.
     * @example
     * // Create many AcademicQualifications
     * const academicQualification = await prisma.academicQualification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicQualificationCreateManyArgs>(args?: SelectSubset<T, AcademicQualificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicQualifications and returns the data saved in the database.
     * @param {AcademicQualificationCreateManyAndReturnArgs} args - Arguments to create many AcademicQualifications.
     * @example
     * // Create many AcademicQualifications
     * const academicQualification = await prisma.academicQualification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicQualifications and only return the `id`
     * const academicQualificationWithIdOnly = await prisma.academicQualification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicQualificationCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicQualificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AcademicQualification.
     * @param {AcademicQualificationDeleteArgs} args - Arguments to delete one AcademicQualification.
     * @example
     * // Delete one AcademicQualification
     * const AcademicQualification = await prisma.academicQualification.delete({
     *   where: {
     *     // ... filter to delete one AcademicQualification
     *   }
     * })
     * 
     */
    delete<T extends AcademicQualificationDeleteArgs>(args: SelectSubset<T, AcademicQualificationDeleteArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicQualification.
     * @param {AcademicQualificationUpdateArgs} args - Arguments to update one AcademicQualification.
     * @example
     * // Update one AcademicQualification
     * const academicQualification = await prisma.academicQualification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicQualificationUpdateArgs>(args: SelectSubset<T, AcademicQualificationUpdateArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicQualifications.
     * @param {AcademicQualificationDeleteManyArgs} args - Arguments to filter AcademicQualifications to delete.
     * @example
     * // Delete a few AcademicQualifications
     * const { count } = await prisma.academicQualification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicQualificationDeleteManyArgs>(args?: SelectSubset<T, AcademicQualificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicQualifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicQualificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicQualifications
     * const academicQualification = await prisma.academicQualification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicQualificationUpdateManyArgs>(args: SelectSubset<T, AcademicQualificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicQualifications and returns the data updated in the database.
     * @param {AcademicQualificationUpdateManyAndReturnArgs} args - Arguments to update many AcademicQualifications.
     * @example
     * // Update many AcademicQualifications
     * const academicQualification = await prisma.academicQualification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicQualifications and only return the `id`
     * const academicQualificationWithIdOnly = await prisma.academicQualification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicQualificationUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicQualificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AcademicQualification.
     * @param {AcademicQualificationUpsertArgs} args - Arguments to update or create a AcademicQualification.
     * @example
     * // Update or create a AcademicQualification
     * const academicQualification = await prisma.academicQualification.upsert({
     *   create: {
     *     // ... data to create a AcademicQualification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicQualification we want to update
     *   }
     * })
     */
    upsert<T extends AcademicQualificationUpsertArgs>(args: SelectSubset<T, AcademicQualificationUpsertArgs<ExtArgs>>): Prisma__AcademicQualificationClient<$Result.GetResult<Prisma.$AcademicQualificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicQualifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicQualificationCountArgs} args - Arguments to filter AcademicQualifications to count.
     * @example
     * // Count the number of AcademicQualifications
     * const count = await prisma.academicQualification.count({
     *   where: {
     *     // ... the filter for the AcademicQualifications we want to count
     *   }
     * })
    **/
    count<T extends AcademicQualificationCountArgs>(
      args?: Subset<T, AcademicQualificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicQualificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicQualification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicQualificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicQualificationAggregateArgs>(args: Subset<T, AcademicQualificationAggregateArgs>): Prisma.PrismaPromise<GetAcademicQualificationAggregateType<T>>

    /**
     * Group by AcademicQualification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicQualificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcademicQualificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicQualificationGroupByArgs['orderBy'] }
        : { orderBy?: AcademicQualificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcademicQualificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicQualificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicQualification model
   */
  readonly fields: AcademicQualificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicQualification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicQualificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicQualification model
   */
  interface AcademicQualificationFieldRefs {
    readonly id: FieldRef<"AcademicQualification", 'String'>
    readonly degree: FieldRef<"AcademicQualification", 'String'>
    readonly institution: FieldRef<"AcademicQualification", 'String'>
    readonly program: FieldRef<"AcademicQualification", 'String'>
    readonly yearCompleted: FieldRef<"AcademicQualification", 'Int'>
    readonly createdAt: FieldRef<"AcademicQualification", 'DateTime'>
    readonly updatedAt: FieldRef<"AcademicQualification", 'DateTime'>
    readonly userId: FieldRef<"AcademicQualification", 'String'>
    readonly diplomaFileUrl: FieldRef<"AcademicQualification", 'String'>
    readonly status: FieldRef<"AcademicQualification", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"AcademicQualification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AcademicQualification findUnique
   */
  export type AcademicQualificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * Filter, which AcademicQualification to fetch.
     */
    where: AcademicQualificationWhereUniqueInput
  }

  /**
   * AcademicQualification findUniqueOrThrow
   */
  export type AcademicQualificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * Filter, which AcademicQualification to fetch.
     */
    where: AcademicQualificationWhereUniqueInput
  }

  /**
   * AcademicQualification findFirst
   */
  export type AcademicQualificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * Filter, which AcademicQualification to fetch.
     */
    where?: AcademicQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicQualifications to fetch.
     */
    orderBy?: AcademicQualificationOrderByWithRelationInput | AcademicQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicQualifications.
     */
    cursor?: AcademicQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicQualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicQualifications.
     */
    distinct?: AcademicQualificationScalarFieldEnum | AcademicQualificationScalarFieldEnum[]
  }

  /**
   * AcademicQualification findFirstOrThrow
   */
  export type AcademicQualificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * Filter, which AcademicQualification to fetch.
     */
    where?: AcademicQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicQualifications to fetch.
     */
    orderBy?: AcademicQualificationOrderByWithRelationInput | AcademicQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicQualifications.
     */
    cursor?: AcademicQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicQualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicQualifications.
     */
    distinct?: AcademicQualificationScalarFieldEnum | AcademicQualificationScalarFieldEnum[]
  }

  /**
   * AcademicQualification findMany
   */
  export type AcademicQualificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * Filter, which AcademicQualifications to fetch.
     */
    where?: AcademicQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicQualifications to fetch.
     */
    orderBy?: AcademicQualificationOrderByWithRelationInput | AcademicQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicQualifications.
     */
    cursor?: AcademicQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicQualifications.
     */
    skip?: number
    distinct?: AcademicQualificationScalarFieldEnum | AcademicQualificationScalarFieldEnum[]
  }

  /**
   * AcademicQualification create
   */
  export type AcademicQualificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicQualification.
     */
    data: XOR<AcademicQualificationCreateInput, AcademicQualificationUncheckedCreateInput>
  }

  /**
   * AcademicQualification createMany
   */
  export type AcademicQualificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicQualifications.
     */
    data: AcademicQualificationCreateManyInput | AcademicQualificationCreateManyInput[]
  }

  /**
   * AcademicQualification createManyAndReturn
   */
  export type AcademicQualificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicQualifications.
     */
    data: AcademicQualificationCreateManyInput | AcademicQualificationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicQualification update
   */
  export type AcademicQualificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicQualification.
     */
    data: XOR<AcademicQualificationUpdateInput, AcademicQualificationUncheckedUpdateInput>
    /**
     * Choose, which AcademicQualification to update.
     */
    where: AcademicQualificationWhereUniqueInput
  }

  /**
   * AcademicQualification updateMany
   */
  export type AcademicQualificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicQualifications.
     */
    data: XOR<AcademicQualificationUpdateManyMutationInput, AcademicQualificationUncheckedUpdateManyInput>
    /**
     * Filter which AcademicQualifications to update
     */
    where?: AcademicQualificationWhereInput
    /**
     * Limit how many AcademicQualifications to update.
     */
    limit?: number
  }

  /**
   * AcademicQualification updateManyAndReturn
   */
  export type AcademicQualificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * The data used to update AcademicQualifications.
     */
    data: XOR<AcademicQualificationUpdateManyMutationInput, AcademicQualificationUncheckedUpdateManyInput>
    /**
     * Filter which AcademicQualifications to update
     */
    where?: AcademicQualificationWhereInput
    /**
     * Limit how many AcademicQualifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicQualification upsert
   */
  export type AcademicQualificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicQualification to update in case it exists.
     */
    where: AcademicQualificationWhereUniqueInput
    /**
     * In case the AcademicQualification found by the `where` argument doesn't exist, create a new AcademicQualification with this data.
     */
    create: XOR<AcademicQualificationCreateInput, AcademicQualificationUncheckedCreateInput>
    /**
     * In case the AcademicQualification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicQualificationUpdateInput, AcademicQualificationUncheckedUpdateInput>
  }

  /**
   * AcademicQualification delete
   */
  export type AcademicQualificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
    /**
     * Filter which AcademicQualification to delete.
     */
    where: AcademicQualificationWhereUniqueInput
  }

  /**
   * AcademicQualification deleteMany
   */
  export type AcademicQualificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicQualifications to delete
     */
    where?: AcademicQualificationWhereInput
    /**
     * Limit how many AcademicQualifications to delete.
     */
    limit?: number
  }

  /**
   * AcademicQualification without action
   */
  export type AcademicQualificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicQualification
     */
    select?: AcademicQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicQualification
     */
    omit?: AcademicQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicQualificationInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalLicense
   */

  export type AggregateProfessionalLicense = {
    _count: ProfessionalLicenseCountAggregateOutputType | null
    _min: ProfessionalLicenseMinAggregateOutputType | null
    _max: ProfessionalLicenseMaxAggregateOutputType | null
  }

  export type ProfessionalLicenseMinAggregateOutputType = {
    id: string | null
    examination: string | null
    monthYear: string | null
    licenseNumber: string | null
    expiration: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    licenseFileUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ProfessionalLicenseMaxAggregateOutputType = {
    id: string | null
    examination: string | null
    monthYear: string | null
    licenseNumber: string | null
    expiration: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    licenseFileUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ProfessionalLicenseCountAggregateOutputType = {
    id: number
    examination: number
    monthYear: number
    licenseNumber: number
    expiration: number
    createdAt: number
    updatedAt: number
    userId: number
    licenseFileUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type ProfessionalLicenseMinAggregateInputType = {
    id?: true
    examination?: true
    monthYear?: true
    licenseNumber?: true
    expiration?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    licenseFileUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ProfessionalLicenseMaxAggregateInputType = {
    id?: true
    examination?: true
    monthYear?: true
    licenseNumber?: true
    expiration?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    licenseFileUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ProfessionalLicenseCountAggregateInputType = {
    id?: true
    examination?: true
    monthYear?: true
    licenseNumber?: true
    expiration?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    licenseFileUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type ProfessionalLicenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalLicense to aggregate.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalLicenses
    **/
    _count?: true | ProfessionalLicenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalLicenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalLicenseMaxAggregateInputType
  }

  export type GetProfessionalLicenseAggregateType<T extends ProfessionalLicenseAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalLicense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalLicense[P]>
      : GetScalarType<T[P], AggregateProfessionalLicense[P]>
  }




  export type ProfessionalLicenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalLicenseWhereInput
    orderBy?: ProfessionalLicenseOrderByWithAggregationInput | ProfessionalLicenseOrderByWithAggregationInput[]
    by: ProfessionalLicenseScalarFieldEnum[] | ProfessionalLicenseScalarFieldEnum
    having?: ProfessionalLicenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalLicenseCountAggregateInputType | true
    _min?: ProfessionalLicenseMinAggregateInputType
    _max?: ProfessionalLicenseMaxAggregateInputType
  }

  export type ProfessionalLicenseGroupByOutputType = {
    id: string
    examination: string
    monthYear: string
    licenseNumber: string
    expiration: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    licenseFileUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: ProfessionalLicenseCountAggregateOutputType | null
    _min: ProfessionalLicenseMinAggregateOutputType | null
    _max: ProfessionalLicenseMaxAggregateOutputType | null
  }

  type GetProfessionalLicenseGroupByPayload<T extends ProfessionalLicenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalLicenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalLicenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalLicenseGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalLicenseGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalLicenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examination?: boolean
    monthYear?: boolean
    licenseNumber?: boolean
    expiration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    licenseFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalLicense"]>

  export type ProfessionalLicenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examination?: boolean
    monthYear?: boolean
    licenseNumber?: boolean
    expiration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    licenseFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalLicense"]>

  export type ProfessionalLicenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examination?: boolean
    monthYear?: boolean
    licenseNumber?: boolean
    expiration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    licenseFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalLicense"]>

  export type ProfessionalLicenseSelectScalar = {
    id?: boolean
    examination?: boolean
    monthYear?: boolean
    licenseNumber?: boolean
    expiration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    licenseFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type ProfessionalLicenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "examination" | "monthYear" | "licenseNumber" | "expiration" | "createdAt" | "updatedAt" | "userId" | "licenseFileUrl" | "status" | "rejectionReason", ExtArgs["result"]["professionalLicense"]>
  export type ProfessionalLicenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfessionalLicenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfessionalLicenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfessionalLicensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalLicense"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      examination: string
      monthYear: string
      licenseNumber: string
      expiration: Date
      createdAt: Date
      updatedAt: Date
      userId: string
      licenseFileUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["professionalLicense"]>
    composites: {}
  }

  type ProfessionalLicenseGetPayload<S extends boolean | null | undefined | ProfessionalLicenseDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalLicensePayload, S>

  type ProfessionalLicenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalLicenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalLicenseCountAggregateInputType | true
    }

  export interface ProfessionalLicenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalLicense'], meta: { name: 'ProfessionalLicense' } }
    /**
     * Find zero or one ProfessionalLicense that matches the filter.
     * @param {ProfessionalLicenseFindUniqueArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalLicenseFindUniqueArgs>(args: SelectSubset<T, ProfessionalLicenseFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalLicense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalLicenseFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalLicenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalLicenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalLicense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseFindFirstArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalLicenseFindFirstArgs>(args?: SelectSubset<T, ProfessionalLicenseFindFirstArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalLicense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseFindFirstOrThrowArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalLicenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalLicenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalLicenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalLicenses
     * const professionalLicenses = await prisma.professionalLicense.findMany()
     * 
     * // Get first 10 ProfessionalLicenses
     * const professionalLicenses = await prisma.professionalLicense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalLicenseWithIdOnly = await prisma.professionalLicense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalLicenseFindManyArgs>(args?: SelectSubset<T, ProfessionalLicenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalLicense.
     * @param {ProfessionalLicenseCreateArgs} args - Arguments to create a ProfessionalLicense.
     * @example
     * // Create one ProfessionalLicense
     * const ProfessionalLicense = await prisma.professionalLicense.create({
     *   data: {
     *     // ... data to create a ProfessionalLicense
     *   }
     * })
     * 
     */
    create<T extends ProfessionalLicenseCreateArgs>(args: SelectSubset<T, ProfessionalLicenseCreateArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalLicenses.
     * @param {ProfessionalLicenseCreateManyArgs} args - Arguments to create many ProfessionalLicenses.
     * @example
     * // Create many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalLicenseCreateManyArgs>(args?: SelectSubset<T, ProfessionalLicenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalLicenses and returns the data saved in the database.
     * @param {ProfessionalLicenseCreateManyAndReturnArgs} args - Arguments to create many ProfessionalLicenses.
     * @example
     * // Create many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalLicenses and only return the `id`
     * const professionalLicenseWithIdOnly = await prisma.professionalLicense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalLicenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalLicenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalLicense.
     * @param {ProfessionalLicenseDeleteArgs} args - Arguments to delete one ProfessionalLicense.
     * @example
     * // Delete one ProfessionalLicense
     * const ProfessionalLicense = await prisma.professionalLicense.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalLicense
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalLicenseDeleteArgs>(args: SelectSubset<T, ProfessionalLicenseDeleteArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalLicense.
     * @param {ProfessionalLicenseUpdateArgs} args - Arguments to update one ProfessionalLicense.
     * @example
     * // Update one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalLicenseUpdateArgs>(args: SelectSubset<T, ProfessionalLicenseUpdateArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalLicenses.
     * @param {ProfessionalLicenseDeleteManyArgs} args - Arguments to filter ProfessionalLicenses to delete.
     * @example
     * // Delete a few ProfessionalLicenses
     * const { count } = await prisma.professionalLicense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalLicenseDeleteManyArgs>(args?: SelectSubset<T, ProfessionalLicenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalLicenseUpdateManyArgs>(args: SelectSubset<T, ProfessionalLicenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalLicenses and returns the data updated in the database.
     * @param {ProfessionalLicenseUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalLicenses.
     * @example
     * // Update many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalLicenses and only return the `id`
     * const professionalLicenseWithIdOnly = await prisma.professionalLicense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalLicenseUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalLicenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalLicense.
     * @param {ProfessionalLicenseUpsertArgs} args - Arguments to update or create a ProfessionalLicense.
     * @example
     * // Update or create a ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.upsert({
     *   create: {
     *     // ... data to create a ProfessionalLicense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalLicense we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalLicenseUpsertArgs>(args: SelectSubset<T, ProfessionalLicenseUpsertArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseCountArgs} args - Arguments to filter ProfessionalLicenses to count.
     * @example
     * // Count the number of ProfessionalLicenses
     * const count = await prisma.professionalLicense.count({
     *   where: {
     *     // ... the filter for the ProfessionalLicenses we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalLicenseCountArgs>(
      args?: Subset<T, ProfessionalLicenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalLicenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalLicenseAggregateArgs>(args: Subset<T, ProfessionalLicenseAggregateArgs>): Prisma.PrismaPromise<GetProfessionalLicenseAggregateType<T>>

    /**
     * Group by ProfessionalLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalLicenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalLicenseGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalLicenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalLicenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalLicenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalLicense model
   */
  readonly fields: ProfessionalLicenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalLicense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalLicenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalLicense model
   */
  interface ProfessionalLicenseFieldRefs {
    readonly id: FieldRef<"ProfessionalLicense", 'String'>
    readonly examination: FieldRef<"ProfessionalLicense", 'String'>
    readonly monthYear: FieldRef<"ProfessionalLicense", 'String'>
    readonly licenseNumber: FieldRef<"ProfessionalLicense", 'String'>
    readonly expiration: FieldRef<"ProfessionalLicense", 'DateTime'>
    readonly createdAt: FieldRef<"ProfessionalLicense", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalLicense", 'DateTime'>
    readonly userId: FieldRef<"ProfessionalLicense", 'String'>
    readonly licenseFileUrl: FieldRef<"ProfessionalLicense", 'String'>
    readonly status: FieldRef<"ProfessionalLicense", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"ProfessionalLicense", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalLicense findUnique
   */
  export type ProfessionalLicenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense findUniqueOrThrow
   */
  export type ProfessionalLicenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense findFirst
   */
  export type ProfessionalLicenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalLicenses.
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalLicenses.
     */
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * ProfessionalLicense findFirstOrThrow
   */
  export type ProfessionalLicenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalLicenses.
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalLicenses.
     */
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * ProfessionalLicense findMany
   */
  export type ProfessionalLicenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicenses to fetch.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalLicenses.
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * ProfessionalLicense create
   */
  export type ProfessionalLicenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalLicense.
     */
    data: XOR<ProfessionalLicenseCreateInput, ProfessionalLicenseUncheckedCreateInput>
  }

  /**
   * ProfessionalLicense createMany
   */
  export type ProfessionalLicenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalLicenses.
     */
    data: ProfessionalLicenseCreateManyInput | ProfessionalLicenseCreateManyInput[]
  }

  /**
   * ProfessionalLicense createManyAndReturn
   */
  export type ProfessionalLicenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalLicenses.
     */
    data: ProfessionalLicenseCreateManyInput | ProfessionalLicenseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalLicense update
   */
  export type ProfessionalLicenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalLicense.
     */
    data: XOR<ProfessionalLicenseUpdateInput, ProfessionalLicenseUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalLicense to update.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense updateMany
   */
  export type ProfessionalLicenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalLicenses.
     */
    data: XOR<ProfessionalLicenseUpdateManyMutationInput, ProfessionalLicenseUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalLicenses to update
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * Limit how many ProfessionalLicenses to update.
     */
    limit?: number
  }

  /**
   * ProfessionalLicense updateManyAndReturn
   */
  export type ProfessionalLicenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalLicenses.
     */
    data: XOR<ProfessionalLicenseUpdateManyMutationInput, ProfessionalLicenseUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalLicenses to update
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * Limit how many ProfessionalLicenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalLicense upsert
   */
  export type ProfessionalLicenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalLicense to update in case it exists.
     */
    where: ProfessionalLicenseWhereUniqueInput
    /**
     * In case the ProfessionalLicense found by the `where` argument doesn't exist, create a new ProfessionalLicense with this data.
     */
    create: XOR<ProfessionalLicenseCreateInput, ProfessionalLicenseUncheckedCreateInput>
    /**
     * In case the ProfessionalLicense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalLicenseUpdateInput, ProfessionalLicenseUncheckedUpdateInput>
  }

  /**
   * ProfessionalLicense delete
   */
  export type ProfessionalLicenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalLicense to delete.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense deleteMany
   */
  export type ProfessionalLicenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalLicenses to delete
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * Limit how many ProfessionalLicenses to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalLicense without action
   */
  export type ProfessionalLicenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
  }


  /**
   * Model WorkExperience
   */

  export type AggregateWorkExperience = {
    _count: WorkExperienceCountAggregateOutputType | null
    _min: WorkExperienceMinAggregateOutputType | null
    _max: WorkExperienceMaxAggregateOutputType | null
  }

  export type WorkExperienceMinAggregateOutputType = {
    id: string | null
    institution: string | null
    position: string | null
    natureOfWork: string | null
    inclusiveYears: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    proofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type WorkExperienceMaxAggregateOutputType = {
    id: string | null
    institution: string | null
    position: string | null
    natureOfWork: string | null
    inclusiveYears: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    proofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type WorkExperienceCountAggregateOutputType = {
    id: number
    institution: number
    position: number
    natureOfWork: number
    inclusiveYears: number
    createdAt: number
    updatedAt: number
    userId: number
    proofUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type WorkExperienceMinAggregateInputType = {
    id?: true
    institution?: true
    position?: true
    natureOfWork?: true
    inclusiveYears?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type WorkExperienceMaxAggregateInputType = {
    id?: true
    institution?: true
    position?: true
    natureOfWork?: true
    inclusiveYears?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type WorkExperienceCountAggregateInputType = {
    id?: true
    institution?: true
    position?: true
    natureOfWork?: true
    inclusiveYears?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type WorkExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkExperience to aggregate.
     */
    where?: WorkExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkExperiences to fetch.
     */
    orderBy?: WorkExperienceOrderByWithRelationInput | WorkExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkExperiences
    **/
    _count?: true | WorkExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkExperienceMaxAggregateInputType
  }

  export type GetWorkExperienceAggregateType<T extends WorkExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkExperience[P]>
      : GetScalarType<T[P], AggregateWorkExperience[P]>
  }




  export type WorkExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkExperienceWhereInput
    orderBy?: WorkExperienceOrderByWithAggregationInput | WorkExperienceOrderByWithAggregationInput[]
    by: WorkExperienceScalarFieldEnum[] | WorkExperienceScalarFieldEnum
    having?: WorkExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkExperienceCountAggregateInputType | true
    _min?: WorkExperienceMinAggregateInputType
    _max?: WorkExperienceMaxAggregateInputType
  }

  export type WorkExperienceGroupByOutputType = {
    id: string
    institution: string
    position: string
    natureOfWork: string | null
    inclusiveYears: string
    createdAt: Date
    updatedAt: Date
    userId: string
    proofUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: WorkExperienceCountAggregateOutputType | null
    _min: WorkExperienceMinAggregateOutputType | null
    _max: WorkExperienceMaxAggregateOutputType | null
  }

  type GetWorkExperienceGroupByPayload<T extends WorkExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], WorkExperienceGroupByOutputType[P]>
        }
      >
    >


  export type WorkExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    institution?: boolean
    position?: boolean
    natureOfWork?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workExperience"]>

  export type WorkExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    institution?: boolean
    position?: boolean
    natureOfWork?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workExperience"]>

  export type WorkExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    institution?: boolean
    position?: boolean
    natureOfWork?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workExperience"]>

  export type WorkExperienceSelectScalar = {
    id?: boolean
    institution?: boolean
    position?: boolean
    natureOfWork?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type WorkExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "institution" | "position" | "natureOfWork" | "inclusiveYears" | "createdAt" | "updatedAt" | "userId" | "proofUrl" | "status" | "rejectionReason", ExtArgs["result"]["workExperience"]>
  export type WorkExperienceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkExperienceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkExperienceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkExperience"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      institution: string
      position: string
      natureOfWork: string | null
      inclusiveYears: string
      createdAt: Date
      updatedAt: Date
      userId: string
      proofUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["workExperience"]>
    composites: {}
  }

  type WorkExperienceGetPayload<S extends boolean | null | undefined | WorkExperienceDefaultArgs> = $Result.GetResult<Prisma.$WorkExperiencePayload, S>

  type WorkExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkExperienceCountAggregateInputType | true
    }

  export interface WorkExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkExperience'], meta: { name: 'WorkExperience' } }
    /**
     * Find zero or one WorkExperience that matches the filter.
     * @param {WorkExperienceFindUniqueArgs} args - Arguments to find a WorkExperience
     * @example
     * // Get one WorkExperience
     * const workExperience = await prisma.workExperience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkExperienceFindUniqueArgs>(args: SelectSubset<T, WorkExperienceFindUniqueArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkExperience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkExperienceFindUniqueOrThrowArgs} args - Arguments to find a WorkExperience
     * @example
     * // Get one WorkExperience
     * const workExperience = await prisma.workExperience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkExperience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkExperienceFindFirstArgs} args - Arguments to find a WorkExperience
     * @example
     * // Get one WorkExperience
     * const workExperience = await prisma.workExperience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkExperienceFindFirstArgs>(args?: SelectSubset<T, WorkExperienceFindFirstArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkExperience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkExperienceFindFirstOrThrowArgs} args - Arguments to find a WorkExperience
     * @example
     * // Get one WorkExperience
     * const workExperience = await prisma.workExperience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkExperiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkExperiences
     * const workExperiences = await prisma.workExperience.findMany()
     * 
     * // Get first 10 WorkExperiences
     * const workExperiences = await prisma.workExperience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workExperienceWithIdOnly = await prisma.workExperience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkExperienceFindManyArgs>(args?: SelectSubset<T, WorkExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkExperience.
     * @param {WorkExperienceCreateArgs} args - Arguments to create a WorkExperience.
     * @example
     * // Create one WorkExperience
     * const WorkExperience = await prisma.workExperience.create({
     *   data: {
     *     // ... data to create a WorkExperience
     *   }
     * })
     * 
     */
    create<T extends WorkExperienceCreateArgs>(args: SelectSubset<T, WorkExperienceCreateArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkExperiences.
     * @param {WorkExperienceCreateManyArgs} args - Arguments to create many WorkExperiences.
     * @example
     * // Create many WorkExperiences
     * const workExperience = await prisma.workExperience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkExperienceCreateManyArgs>(args?: SelectSubset<T, WorkExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkExperiences and returns the data saved in the database.
     * @param {WorkExperienceCreateManyAndReturnArgs} args - Arguments to create many WorkExperiences.
     * @example
     * // Create many WorkExperiences
     * const workExperience = await prisma.workExperience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkExperiences and only return the `id`
     * const workExperienceWithIdOnly = await prisma.workExperience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkExperience.
     * @param {WorkExperienceDeleteArgs} args - Arguments to delete one WorkExperience.
     * @example
     * // Delete one WorkExperience
     * const WorkExperience = await prisma.workExperience.delete({
     *   where: {
     *     // ... filter to delete one WorkExperience
     *   }
     * })
     * 
     */
    delete<T extends WorkExperienceDeleteArgs>(args: SelectSubset<T, WorkExperienceDeleteArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkExperience.
     * @param {WorkExperienceUpdateArgs} args - Arguments to update one WorkExperience.
     * @example
     * // Update one WorkExperience
     * const workExperience = await prisma.workExperience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkExperienceUpdateArgs>(args: SelectSubset<T, WorkExperienceUpdateArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkExperiences.
     * @param {WorkExperienceDeleteManyArgs} args - Arguments to filter WorkExperiences to delete.
     * @example
     * // Delete a few WorkExperiences
     * const { count } = await prisma.workExperience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkExperienceDeleteManyArgs>(args?: SelectSubset<T, WorkExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkExperiences
     * const workExperience = await prisma.workExperience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkExperienceUpdateManyArgs>(args: SelectSubset<T, WorkExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkExperiences and returns the data updated in the database.
     * @param {WorkExperienceUpdateManyAndReturnArgs} args - Arguments to update many WorkExperiences.
     * @example
     * // Update many WorkExperiences
     * const workExperience = await prisma.workExperience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkExperiences and only return the `id`
     * const workExperienceWithIdOnly = await prisma.workExperience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkExperience.
     * @param {WorkExperienceUpsertArgs} args - Arguments to update or create a WorkExperience.
     * @example
     * // Update or create a WorkExperience
     * const workExperience = await prisma.workExperience.upsert({
     *   create: {
     *     // ... data to create a WorkExperience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkExperience we want to update
     *   }
     * })
     */
    upsert<T extends WorkExperienceUpsertArgs>(args: SelectSubset<T, WorkExperienceUpsertArgs<ExtArgs>>): Prisma__WorkExperienceClient<$Result.GetResult<Prisma.$WorkExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkExperienceCountArgs} args - Arguments to filter WorkExperiences to count.
     * @example
     * // Count the number of WorkExperiences
     * const count = await prisma.workExperience.count({
     *   where: {
     *     // ... the filter for the WorkExperiences we want to count
     *   }
     * })
    **/
    count<T extends WorkExperienceCountArgs>(
      args?: Subset<T, WorkExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkExperienceAggregateArgs>(args: Subset<T, WorkExperienceAggregateArgs>): Prisma.PrismaPromise<GetWorkExperienceAggregateType<T>>

    /**
     * Group by WorkExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkExperienceGroupByArgs['orderBy'] }
        : { orderBy?: WorkExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkExperience model
   */
  readonly fields: WorkExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkExperience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkExperience model
   */
  interface WorkExperienceFieldRefs {
    readonly id: FieldRef<"WorkExperience", 'String'>
    readonly institution: FieldRef<"WorkExperience", 'String'>
    readonly position: FieldRef<"WorkExperience", 'String'>
    readonly natureOfWork: FieldRef<"WorkExperience", 'String'>
    readonly inclusiveYears: FieldRef<"WorkExperience", 'String'>
    readonly createdAt: FieldRef<"WorkExperience", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkExperience", 'DateTime'>
    readonly userId: FieldRef<"WorkExperience", 'String'>
    readonly proofUrl: FieldRef<"WorkExperience", 'String'>
    readonly status: FieldRef<"WorkExperience", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"WorkExperience", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkExperience findUnique
   */
  export type WorkExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * Filter, which WorkExperience to fetch.
     */
    where: WorkExperienceWhereUniqueInput
  }

  /**
   * WorkExperience findUniqueOrThrow
   */
  export type WorkExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * Filter, which WorkExperience to fetch.
     */
    where: WorkExperienceWhereUniqueInput
  }

  /**
   * WorkExperience findFirst
   */
  export type WorkExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * Filter, which WorkExperience to fetch.
     */
    where?: WorkExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkExperiences to fetch.
     */
    orderBy?: WorkExperienceOrderByWithRelationInput | WorkExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkExperiences.
     */
    cursor?: WorkExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkExperiences.
     */
    distinct?: WorkExperienceScalarFieldEnum | WorkExperienceScalarFieldEnum[]
  }

  /**
   * WorkExperience findFirstOrThrow
   */
  export type WorkExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * Filter, which WorkExperience to fetch.
     */
    where?: WorkExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkExperiences to fetch.
     */
    orderBy?: WorkExperienceOrderByWithRelationInput | WorkExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkExperiences.
     */
    cursor?: WorkExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkExperiences.
     */
    distinct?: WorkExperienceScalarFieldEnum | WorkExperienceScalarFieldEnum[]
  }

  /**
   * WorkExperience findMany
   */
  export type WorkExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * Filter, which WorkExperiences to fetch.
     */
    where?: WorkExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkExperiences to fetch.
     */
    orderBy?: WorkExperienceOrderByWithRelationInput | WorkExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkExperiences.
     */
    cursor?: WorkExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkExperiences.
     */
    skip?: number
    distinct?: WorkExperienceScalarFieldEnum | WorkExperienceScalarFieldEnum[]
  }

  /**
   * WorkExperience create
   */
  export type WorkExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkExperience.
     */
    data: XOR<WorkExperienceCreateInput, WorkExperienceUncheckedCreateInput>
  }

  /**
   * WorkExperience createMany
   */
  export type WorkExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkExperiences.
     */
    data: WorkExperienceCreateManyInput | WorkExperienceCreateManyInput[]
  }

  /**
   * WorkExperience createManyAndReturn
   */
  export type WorkExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many WorkExperiences.
     */
    data: WorkExperienceCreateManyInput | WorkExperienceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkExperience update
   */
  export type WorkExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkExperience.
     */
    data: XOR<WorkExperienceUpdateInput, WorkExperienceUncheckedUpdateInput>
    /**
     * Choose, which WorkExperience to update.
     */
    where: WorkExperienceWhereUniqueInput
  }

  /**
   * WorkExperience updateMany
   */
  export type WorkExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkExperiences.
     */
    data: XOR<WorkExperienceUpdateManyMutationInput, WorkExperienceUncheckedUpdateManyInput>
    /**
     * Filter which WorkExperiences to update
     */
    where?: WorkExperienceWhereInput
    /**
     * Limit how many WorkExperiences to update.
     */
    limit?: number
  }

  /**
   * WorkExperience updateManyAndReturn
   */
  export type WorkExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * The data used to update WorkExperiences.
     */
    data: XOR<WorkExperienceUpdateManyMutationInput, WorkExperienceUncheckedUpdateManyInput>
    /**
     * Filter which WorkExperiences to update
     */
    where?: WorkExperienceWhereInput
    /**
     * Limit how many WorkExperiences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkExperience upsert
   */
  export type WorkExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkExperience to update in case it exists.
     */
    where: WorkExperienceWhereUniqueInput
    /**
     * In case the WorkExperience found by the `where` argument doesn't exist, create a new WorkExperience with this data.
     */
    create: XOR<WorkExperienceCreateInput, WorkExperienceUncheckedCreateInput>
    /**
     * In case the WorkExperience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkExperienceUpdateInput, WorkExperienceUncheckedUpdateInput>
  }

  /**
   * WorkExperience delete
   */
  export type WorkExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
    /**
     * Filter which WorkExperience to delete.
     */
    where: WorkExperienceWhereUniqueInput
  }

  /**
   * WorkExperience deleteMany
   */
  export type WorkExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkExperiences to delete
     */
    where?: WorkExperienceWhereInput
    /**
     * Limit how many WorkExperiences to delete.
     */
    limit?: number
  }

  /**
   * WorkExperience without action
   */
  export type WorkExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkExperience
     */
    select?: WorkExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkExperience
     */
    omit?: WorkExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkExperienceInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalAffiliation
   */

  export type AggregateProfessionalAffiliation = {
    _count: ProfessionalAffiliationCountAggregateOutputType | null
    _min: ProfessionalAffiliationMinAggregateOutputType | null
    _max: ProfessionalAffiliationMaxAggregateOutputType | null
  }

  export type ProfessionalAffiliationMinAggregateOutputType = {
    id: string | null
    organization: string | null
    position: string | null
    inclusiveYears: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    membershipProofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ProfessionalAffiliationMaxAggregateOutputType = {
    id: string | null
    organization: string | null
    position: string | null
    inclusiveYears: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    membershipProofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ProfessionalAffiliationCountAggregateOutputType = {
    id: number
    organization: number
    position: number
    inclusiveYears: number
    createdAt: number
    updatedAt: number
    userId: number
    membershipProofUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type ProfessionalAffiliationMinAggregateInputType = {
    id?: true
    organization?: true
    position?: true
    inclusiveYears?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    membershipProofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ProfessionalAffiliationMaxAggregateInputType = {
    id?: true
    organization?: true
    position?: true
    inclusiveYears?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    membershipProofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ProfessionalAffiliationCountAggregateInputType = {
    id?: true
    organization?: true
    position?: true
    inclusiveYears?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    membershipProofUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type ProfessionalAffiliationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalAffiliation to aggregate.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalAffiliations
    **/
    _count?: true | ProfessionalAffiliationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalAffiliationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalAffiliationMaxAggregateInputType
  }

  export type GetProfessionalAffiliationAggregateType<T extends ProfessionalAffiliationAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalAffiliation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalAffiliation[P]>
      : GetScalarType<T[P], AggregateProfessionalAffiliation[P]>
  }




  export type ProfessionalAffiliationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalAffiliationWhereInput
    orderBy?: ProfessionalAffiliationOrderByWithAggregationInput | ProfessionalAffiliationOrderByWithAggregationInput[]
    by: ProfessionalAffiliationScalarFieldEnum[] | ProfessionalAffiliationScalarFieldEnum
    having?: ProfessionalAffiliationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalAffiliationCountAggregateInputType | true
    _min?: ProfessionalAffiliationMinAggregateInputType
    _max?: ProfessionalAffiliationMaxAggregateInputType
  }

  export type ProfessionalAffiliationGroupByOutputType = {
    id: string
    organization: string
    position: string | null
    inclusiveYears: string
    createdAt: Date
    updatedAt: Date
    userId: string
    membershipProofUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: ProfessionalAffiliationCountAggregateOutputType | null
    _min: ProfessionalAffiliationMinAggregateOutputType | null
    _max: ProfessionalAffiliationMaxAggregateOutputType | null
  }

  type GetProfessionalAffiliationGroupByPayload<T extends ProfessionalAffiliationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalAffiliationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalAffiliationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalAffiliationGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalAffiliationGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalAffiliationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization?: boolean
    position?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    membershipProofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAffiliation"]>

  export type ProfessionalAffiliationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization?: boolean
    position?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    membershipProofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAffiliation"]>

  export type ProfessionalAffiliationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization?: boolean
    position?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    membershipProofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAffiliation"]>

  export type ProfessionalAffiliationSelectScalar = {
    id?: boolean
    organization?: boolean
    position?: boolean
    inclusiveYears?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    membershipProofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type ProfessionalAffiliationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organization" | "position" | "inclusiveYears" | "createdAt" | "updatedAt" | "userId" | "membershipProofUrl" | "status" | "rejectionReason", ExtArgs["result"]["professionalAffiliation"]>
  export type ProfessionalAffiliationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfessionalAffiliationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfessionalAffiliationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfessionalAffiliationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalAffiliation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organization: string
      position: string | null
      inclusiveYears: string
      createdAt: Date
      updatedAt: Date
      userId: string
      membershipProofUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["professionalAffiliation"]>
    composites: {}
  }

  type ProfessionalAffiliationGetPayload<S extends boolean | null | undefined | ProfessionalAffiliationDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalAffiliationPayload, S>

  type ProfessionalAffiliationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalAffiliationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalAffiliationCountAggregateInputType | true
    }

  export interface ProfessionalAffiliationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalAffiliation'], meta: { name: 'ProfessionalAffiliation' } }
    /**
     * Find zero or one ProfessionalAffiliation that matches the filter.
     * @param {ProfessionalAffiliationFindUniqueArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalAffiliationFindUniqueArgs>(args: SelectSubset<T, ProfessionalAffiliationFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalAffiliation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalAffiliationFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalAffiliationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalAffiliationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalAffiliation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationFindFirstArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalAffiliationFindFirstArgs>(args?: SelectSubset<T, ProfessionalAffiliationFindFirstArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalAffiliation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationFindFirstOrThrowArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalAffiliationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalAffiliationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalAffiliations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalAffiliations
     * const professionalAffiliations = await prisma.professionalAffiliation.findMany()
     * 
     * // Get first 10 ProfessionalAffiliations
     * const professionalAffiliations = await prisma.professionalAffiliation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalAffiliationWithIdOnly = await prisma.professionalAffiliation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalAffiliationFindManyArgs>(args?: SelectSubset<T, ProfessionalAffiliationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalAffiliation.
     * @param {ProfessionalAffiliationCreateArgs} args - Arguments to create a ProfessionalAffiliation.
     * @example
     * // Create one ProfessionalAffiliation
     * const ProfessionalAffiliation = await prisma.professionalAffiliation.create({
     *   data: {
     *     // ... data to create a ProfessionalAffiliation
     *   }
     * })
     * 
     */
    create<T extends ProfessionalAffiliationCreateArgs>(args: SelectSubset<T, ProfessionalAffiliationCreateArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalAffiliations.
     * @param {ProfessionalAffiliationCreateManyArgs} args - Arguments to create many ProfessionalAffiliations.
     * @example
     * // Create many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalAffiliationCreateManyArgs>(args?: SelectSubset<T, ProfessionalAffiliationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalAffiliations and returns the data saved in the database.
     * @param {ProfessionalAffiliationCreateManyAndReturnArgs} args - Arguments to create many ProfessionalAffiliations.
     * @example
     * // Create many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalAffiliations and only return the `id`
     * const professionalAffiliationWithIdOnly = await prisma.professionalAffiliation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalAffiliationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalAffiliationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalAffiliation.
     * @param {ProfessionalAffiliationDeleteArgs} args - Arguments to delete one ProfessionalAffiliation.
     * @example
     * // Delete one ProfessionalAffiliation
     * const ProfessionalAffiliation = await prisma.professionalAffiliation.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalAffiliation
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalAffiliationDeleteArgs>(args: SelectSubset<T, ProfessionalAffiliationDeleteArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalAffiliation.
     * @param {ProfessionalAffiliationUpdateArgs} args - Arguments to update one ProfessionalAffiliation.
     * @example
     * // Update one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalAffiliationUpdateArgs>(args: SelectSubset<T, ProfessionalAffiliationUpdateArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalAffiliations.
     * @param {ProfessionalAffiliationDeleteManyArgs} args - Arguments to filter ProfessionalAffiliations to delete.
     * @example
     * // Delete a few ProfessionalAffiliations
     * const { count } = await prisma.professionalAffiliation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalAffiliationDeleteManyArgs>(args?: SelectSubset<T, ProfessionalAffiliationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalAffiliations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalAffiliationUpdateManyArgs>(args: SelectSubset<T, ProfessionalAffiliationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalAffiliations and returns the data updated in the database.
     * @param {ProfessionalAffiliationUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalAffiliations.
     * @example
     * // Update many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalAffiliations and only return the `id`
     * const professionalAffiliationWithIdOnly = await prisma.professionalAffiliation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalAffiliationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalAffiliationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalAffiliation.
     * @param {ProfessionalAffiliationUpsertArgs} args - Arguments to update or create a ProfessionalAffiliation.
     * @example
     * // Update or create a ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.upsert({
     *   create: {
     *     // ... data to create a ProfessionalAffiliation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalAffiliation we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalAffiliationUpsertArgs>(args: SelectSubset<T, ProfessionalAffiliationUpsertArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalAffiliations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationCountArgs} args - Arguments to filter ProfessionalAffiliations to count.
     * @example
     * // Count the number of ProfessionalAffiliations
     * const count = await prisma.professionalAffiliation.count({
     *   where: {
     *     // ... the filter for the ProfessionalAffiliations we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalAffiliationCountArgs>(
      args?: Subset<T, ProfessionalAffiliationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalAffiliationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalAffiliation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalAffiliationAggregateArgs>(args: Subset<T, ProfessionalAffiliationAggregateArgs>): Prisma.PrismaPromise<GetProfessionalAffiliationAggregateType<T>>

    /**
     * Group by ProfessionalAffiliation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalAffiliationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalAffiliationGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalAffiliationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalAffiliationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalAffiliationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalAffiliation model
   */
  readonly fields: ProfessionalAffiliationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalAffiliation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalAffiliationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalAffiliation model
   */
  interface ProfessionalAffiliationFieldRefs {
    readonly id: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly organization: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly position: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly inclusiveYears: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly createdAt: FieldRef<"ProfessionalAffiliation", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalAffiliation", 'DateTime'>
    readonly userId: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly membershipProofUrl: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly status: FieldRef<"ProfessionalAffiliation", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"ProfessionalAffiliation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalAffiliation findUnique
   */
  export type ProfessionalAffiliationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation findUniqueOrThrow
   */
  export type ProfessionalAffiliationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation findFirst
   */
  export type ProfessionalAffiliationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalAffiliations.
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalAffiliations.
     */
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * ProfessionalAffiliation findFirstOrThrow
   */
  export type ProfessionalAffiliationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalAffiliations.
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalAffiliations.
     */
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * ProfessionalAffiliation findMany
   */
  export type ProfessionalAffiliationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliations to fetch.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalAffiliations.
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * ProfessionalAffiliation create
   */
  export type ProfessionalAffiliationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalAffiliation.
     */
    data: XOR<ProfessionalAffiliationCreateInput, ProfessionalAffiliationUncheckedCreateInput>
  }

  /**
   * ProfessionalAffiliation createMany
   */
  export type ProfessionalAffiliationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalAffiliations.
     */
    data: ProfessionalAffiliationCreateManyInput | ProfessionalAffiliationCreateManyInput[]
  }

  /**
   * ProfessionalAffiliation createManyAndReturn
   */
  export type ProfessionalAffiliationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalAffiliations.
     */
    data: ProfessionalAffiliationCreateManyInput | ProfessionalAffiliationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalAffiliation update
   */
  export type ProfessionalAffiliationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalAffiliation.
     */
    data: XOR<ProfessionalAffiliationUpdateInput, ProfessionalAffiliationUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalAffiliation to update.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation updateMany
   */
  export type ProfessionalAffiliationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalAffiliations.
     */
    data: XOR<ProfessionalAffiliationUpdateManyMutationInput, ProfessionalAffiliationUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalAffiliations to update
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * Limit how many ProfessionalAffiliations to update.
     */
    limit?: number
  }

  /**
   * ProfessionalAffiliation updateManyAndReturn
   */
  export type ProfessionalAffiliationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalAffiliations.
     */
    data: XOR<ProfessionalAffiliationUpdateManyMutationInput, ProfessionalAffiliationUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalAffiliations to update
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * Limit how many ProfessionalAffiliations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalAffiliation upsert
   */
  export type ProfessionalAffiliationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalAffiliation to update in case it exists.
     */
    where: ProfessionalAffiliationWhereUniqueInput
    /**
     * In case the ProfessionalAffiliation found by the `where` argument doesn't exist, create a new ProfessionalAffiliation with this data.
     */
    create: XOR<ProfessionalAffiliationCreateInput, ProfessionalAffiliationUncheckedCreateInput>
    /**
     * In case the ProfessionalAffiliation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalAffiliationUpdateInput, ProfessionalAffiliationUncheckedUpdateInput>
  }

  /**
   * ProfessionalAffiliation delete
   */
  export type ProfessionalAffiliationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalAffiliation to delete.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation deleteMany
   */
  export type ProfessionalAffiliationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalAffiliations to delete
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * Limit how many ProfessionalAffiliations to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalAffiliation without action
   */
  export type ProfessionalAffiliationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
  }


  /**
   * Model AwardRecognition
   */

  export type AggregateAwardRecognition = {
    _count: AwardRecognitionCountAggregateOutputType | null
    _avg: AwardRecognitionAvgAggregateOutputType | null
    _sum: AwardRecognitionSumAggregateOutputType | null
    _min: AwardRecognitionMinAggregateOutputType | null
    _max: AwardRecognitionMaxAggregateOutputType | null
  }

  export type AwardRecognitionAvgAggregateOutputType = {
    yearReceived: number | null
  }

  export type AwardRecognitionSumAggregateOutputType = {
    yearReceived: number | null
  }

  export type AwardRecognitionMinAggregateOutputType = {
    id: string | null
    awardName: string | null
    awardingBody: string | null
    yearReceived: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    certificateUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type AwardRecognitionMaxAggregateOutputType = {
    id: string | null
    awardName: string | null
    awardingBody: string | null
    yearReceived: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    certificateUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type AwardRecognitionCountAggregateOutputType = {
    id: number
    awardName: number
    awardingBody: number
    yearReceived: number
    createdAt: number
    updatedAt: number
    userId: number
    certificateUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type AwardRecognitionAvgAggregateInputType = {
    yearReceived?: true
  }

  export type AwardRecognitionSumAggregateInputType = {
    yearReceived?: true
  }

  export type AwardRecognitionMinAggregateInputType = {
    id?: true
    awardName?: true
    awardingBody?: true
    yearReceived?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    certificateUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type AwardRecognitionMaxAggregateInputType = {
    id?: true
    awardName?: true
    awardingBody?: true
    yearReceived?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    certificateUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type AwardRecognitionCountAggregateInputType = {
    id?: true
    awardName?: true
    awardingBody?: true
    yearReceived?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    certificateUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type AwardRecognitionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardRecognition to aggregate.
     */
    where?: AwardRecognitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardRecognitions to fetch.
     */
    orderBy?: AwardRecognitionOrderByWithRelationInput | AwardRecognitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AwardRecognitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardRecognitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardRecognitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AwardRecognitions
    **/
    _count?: true | AwardRecognitionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AwardRecognitionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AwardRecognitionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AwardRecognitionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AwardRecognitionMaxAggregateInputType
  }

  export type GetAwardRecognitionAggregateType<T extends AwardRecognitionAggregateArgs> = {
        [P in keyof T & keyof AggregateAwardRecognition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAwardRecognition[P]>
      : GetScalarType<T[P], AggregateAwardRecognition[P]>
  }




  export type AwardRecognitionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardRecognitionWhereInput
    orderBy?: AwardRecognitionOrderByWithAggregationInput | AwardRecognitionOrderByWithAggregationInput[]
    by: AwardRecognitionScalarFieldEnum[] | AwardRecognitionScalarFieldEnum
    having?: AwardRecognitionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AwardRecognitionCountAggregateInputType | true
    _avg?: AwardRecognitionAvgAggregateInputType
    _sum?: AwardRecognitionSumAggregateInputType
    _min?: AwardRecognitionMinAggregateInputType
    _max?: AwardRecognitionMaxAggregateInputType
  }

  export type AwardRecognitionGroupByOutputType = {
    id: string
    awardName: string
    awardingBody: string
    yearReceived: number
    createdAt: Date
    updatedAt: Date
    userId: string
    certificateUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: AwardRecognitionCountAggregateOutputType | null
    _avg: AwardRecognitionAvgAggregateOutputType | null
    _sum: AwardRecognitionSumAggregateOutputType | null
    _min: AwardRecognitionMinAggregateOutputType | null
    _max: AwardRecognitionMaxAggregateOutputType | null
  }

  type GetAwardRecognitionGroupByPayload<T extends AwardRecognitionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AwardRecognitionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AwardRecognitionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AwardRecognitionGroupByOutputType[P]>
            : GetScalarType<T[P], AwardRecognitionGroupByOutputType[P]>
        }
      >
    >


  export type AwardRecognitionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    awardName?: boolean
    awardingBody?: boolean
    yearReceived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardRecognition"]>

  export type AwardRecognitionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    awardName?: boolean
    awardingBody?: boolean
    yearReceived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardRecognition"]>

  export type AwardRecognitionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    awardName?: boolean
    awardingBody?: boolean
    yearReceived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardRecognition"]>

  export type AwardRecognitionSelectScalar = {
    id?: boolean
    awardName?: boolean
    awardingBody?: boolean
    yearReceived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type AwardRecognitionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "awardName" | "awardingBody" | "yearReceived" | "createdAt" | "updatedAt" | "userId" | "certificateUrl" | "status" | "rejectionReason", ExtArgs["result"]["awardRecognition"]>
  export type AwardRecognitionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AwardRecognitionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AwardRecognitionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AwardRecognitionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AwardRecognition"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      awardName: string
      awardingBody: string
      yearReceived: number
      createdAt: Date
      updatedAt: Date
      userId: string
      certificateUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["awardRecognition"]>
    composites: {}
  }

  type AwardRecognitionGetPayload<S extends boolean | null | undefined | AwardRecognitionDefaultArgs> = $Result.GetResult<Prisma.$AwardRecognitionPayload, S>

  type AwardRecognitionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AwardRecognitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AwardRecognitionCountAggregateInputType | true
    }

  export interface AwardRecognitionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AwardRecognition'], meta: { name: 'AwardRecognition' } }
    /**
     * Find zero or one AwardRecognition that matches the filter.
     * @param {AwardRecognitionFindUniqueArgs} args - Arguments to find a AwardRecognition
     * @example
     * // Get one AwardRecognition
     * const awardRecognition = await prisma.awardRecognition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AwardRecognitionFindUniqueArgs>(args: SelectSubset<T, AwardRecognitionFindUniqueArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AwardRecognition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AwardRecognitionFindUniqueOrThrowArgs} args - Arguments to find a AwardRecognition
     * @example
     * // Get one AwardRecognition
     * const awardRecognition = await prisma.awardRecognition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AwardRecognitionFindUniqueOrThrowArgs>(args: SelectSubset<T, AwardRecognitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AwardRecognition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardRecognitionFindFirstArgs} args - Arguments to find a AwardRecognition
     * @example
     * // Get one AwardRecognition
     * const awardRecognition = await prisma.awardRecognition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AwardRecognitionFindFirstArgs>(args?: SelectSubset<T, AwardRecognitionFindFirstArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AwardRecognition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardRecognitionFindFirstOrThrowArgs} args - Arguments to find a AwardRecognition
     * @example
     * // Get one AwardRecognition
     * const awardRecognition = await prisma.awardRecognition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AwardRecognitionFindFirstOrThrowArgs>(args?: SelectSubset<T, AwardRecognitionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AwardRecognitions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardRecognitionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AwardRecognitions
     * const awardRecognitions = await prisma.awardRecognition.findMany()
     * 
     * // Get first 10 AwardRecognitions
     * const awardRecognitions = await prisma.awardRecognition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const awardRecognitionWithIdOnly = await prisma.awardRecognition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AwardRecognitionFindManyArgs>(args?: SelectSubset<T, AwardRecognitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AwardRecognition.
     * @param {AwardRecognitionCreateArgs} args - Arguments to create a AwardRecognition.
     * @example
     * // Create one AwardRecognition
     * const AwardRecognition = await prisma.awardRecognition.create({
     *   data: {
     *     // ... data to create a AwardRecognition
     *   }
     * })
     * 
     */
    create<T extends AwardRecognitionCreateArgs>(args: SelectSubset<T, AwardRecognitionCreateArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AwardRecognitions.
     * @param {AwardRecognitionCreateManyArgs} args - Arguments to create many AwardRecognitions.
     * @example
     * // Create many AwardRecognitions
     * const awardRecognition = await prisma.awardRecognition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AwardRecognitionCreateManyArgs>(args?: SelectSubset<T, AwardRecognitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AwardRecognitions and returns the data saved in the database.
     * @param {AwardRecognitionCreateManyAndReturnArgs} args - Arguments to create many AwardRecognitions.
     * @example
     * // Create many AwardRecognitions
     * const awardRecognition = await prisma.awardRecognition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AwardRecognitions and only return the `id`
     * const awardRecognitionWithIdOnly = await prisma.awardRecognition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AwardRecognitionCreateManyAndReturnArgs>(args?: SelectSubset<T, AwardRecognitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AwardRecognition.
     * @param {AwardRecognitionDeleteArgs} args - Arguments to delete one AwardRecognition.
     * @example
     * // Delete one AwardRecognition
     * const AwardRecognition = await prisma.awardRecognition.delete({
     *   where: {
     *     // ... filter to delete one AwardRecognition
     *   }
     * })
     * 
     */
    delete<T extends AwardRecognitionDeleteArgs>(args: SelectSubset<T, AwardRecognitionDeleteArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AwardRecognition.
     * @param {AwardRecognitionUpdateArgs} args - Arguments to update one AwardRecognition.
     * @example
     * // Update one AwardRecognition
     * const awardRecognition = await prisma.awardRecognition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AwardRecognitionUpdateArgs>(args: SelectSubset<T, AwardRecognitionUpdateArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AwardRecognitions.
     * @param {AwardRecognitionDeleteManyArgs} args - Arguments to filter AwardRecognitions to delete.
     * @example
     * // Delete a few AwardRecognitions
     * const { count } = await prisma.awardRecognition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AwardRecognitionDeleteManyArgs>(args?: SelectSubset<T, AwardRecognitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AwardRecognitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardRecognitionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AwardRecognitions
     * const awardRecognition = await prisma.awardRecognition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AwardRecognitionUpdateManyArgs>(args: SelectSubset<T, AwardRecognitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AwardRecognitions and returns the data updated in the database.
     * @param {AwardRecognitionUpdateManyAndReturnArgs} args - Arguments to update many AwardRecognitions.
     * @example
     * // Update many AwardRecognitions
     * const awardRecognition = await prisma.awardRecognition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AwardRecognitions and only return the `id`
     * const awardRecognitionWithIdOnly = await prisma.awardRecognition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AwardRecognitionUpdateManyAndReturnArgs>(args: SelectSubset<T, AwardRecognitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AwardRecognition.
     * @param {AwardRecognitionUpsertArgs} args - Arguments to update or create a AwardRecognition.
     * @example
     * // Update or create a AwardRecognition
     * const awardRecognition = await prisma.awardRecognition.upsert({
     *   create: {
     *     // ... data to create a AwardRecognition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AwardRecognition we want to update
     *   }
     * })
     */
    upsert<T extends AwardRecognitionUpsertArgs>(args: SelectSubset<T, AwardRecognitionUpsertArgs<ExtArgs>>): Prisma__AwardRecognitionClient<$Result.GetResult<Prisma.$AwardRecognitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AwardRecognitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardRecognitionCountArgs} args - Arguments to filter AwardRecognitions to count.
     * @example
     * // Count the number of AwardRecognitions
     * const count = await prisma.awardRecognition.count({
     *   where: {
     *     // ... the filter for the AwardRecognitions we want to count
     *   }
     * })
    **/
    count<T extends AwardRecognitionCountArgs>(
      args?: Subset<T, AwardRecognitionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AwardRecognitionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AwardRecognition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardRecognitionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AwardRecognitionAggregateArgs>(args: Subset<T, AwardRecognitionAggregateArgs>): Prisma.PrismaPromise<GetAwardRecognitionAggregateType<T>>

    /**
     * Group by AwardRecognition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardRecognitionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AwardRecognitionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AwardRecognitionGroupByArgs['orderBy'] }
        : { orderBy?: AwardRecognitionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AwardRecognitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAwardRecognitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AwardRecognition model
   */
  readonly fields: AwardRecognitionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AwardRecognition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AwardRecognitionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AwardRecognition model
   */
  interface AwardRecognitionFieldRefs {
    readonly id: FieldRef<"AwardRecognition", 'String'>
    readonly awardName: FieldRef<"AwardRecognition", 'String'>
    readonly awardingBody: FieldRef<"AwardRecognition", 'String'>
    readonly yearReceived: FieldRef<"AwardRecognition", 'Int'>
    readonly createdAt: FieldRef<"AwardRecognition", 'DateTime'>
    readonly updatedAt: FieldRef<"AwardRecognition", 'DateTime'>
    readonly userId: FieldRef<"AwardRecognition", 'String'>
    readonly certificateUrl: FieldRef<"AwardRecognition", 'String'>
    readonly status: FieldRef<"AwardRecognition", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"AwardRecognition", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AwardRecognition findUnique
   */
  export type AwardRecognitionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * Filter, which AwardRecognition to fetch.
     */
    where: AwardRecognitionWhereUniqueInput
  }

  /**
   * AwardRecognition findUniqueOrThrow
   */
  export type AwardRecognitionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * Filter, which AwardRecognition to fetch.
     */
    where: AwardRecognitionWhereUniqueInput
  }

  /**
   * AwardRecognition findFirst
   */
  export type AwardRecognitionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * Filter, which AwardRecognition to fetch.
     */
    where?: AwardRecognitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardRecognitions to fetch.
     */
    orderBy?: AwardRecognitionOrderByWithRelationInput | AwardRecognitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardRecognitions.
     */
    cursor?: AwardRecognitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardRecognitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardRecognitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardRecognitions.
     */
    distinct?: AwardRecognitionScalarFieldEnum | AwardRecognitionScalarFieldEnum[]
  }

  /**
   * AwardRecognition findFirstOrThrow
   */
  export type AwardRecognitionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * Filter, which AwardRecognition to fetch.
     */
    where?: AwardRecognitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardRecognitions to fetch.
     */
    orderBy?: AwardRecognitionOrderByWithRelationInput | AwardRecognitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardRecognitions.
     */
    cursor?: AwardRecognitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardRecognitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardRecognitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardRecognitions.
     */
    distinct?: AwardRecognitionScalarFieldEnum | AwardRecognitionScalarFieldEnum[]
  }

  /**
   * AwardRecognition findMany
   */
  export type AwardRecognitionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * Filter, which AwardRecognitions to fetch.
     */
    where?: AwardRecognitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardRecognitions to fetch.
     */
    orderBy?: AwardRecognitionOrderByWithRelationInput | AwardRecognitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AwardRecognitions.
     */
    cursor?: AwardRecognitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardRecognitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardRecognitions.
     */
    skip?: number
    distinct?: AwardRecognitionScalarFieldEnum | AwardRecognitionScalarFieldEnum[]
  }

  /**
   * AwardRecognition create
   */
  export type AwardRecognitionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * The data needed to create a AwardRecognition.
     */
    data: XOR<AwardRecognitionCreateInput, AwardRecognitionUncheckedCreateInput>
  }

  /**
   * AwardRecognition createMany
   */
  export type AwardRecognitionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AwardRecognitions.
     */
    data: AwardRecognitionCreateManyInput | AwardRecognitionCreateManyInput[]
  }

  /**
   * AwardRecognition createManyAndReturn
   */
  export type AwardRecognitionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * The data used to create many AwardRecognitions.
     */
    data: AwardRecognitionCreateManyInput | AwardRecognitionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AwardRecognition update
   */
  export type AwardRecognitionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * The data needed to update a AwardRecognition.
     */
    data: XOR<AwardRecognitionUpdateInput, AwardRecognitionUncheckedUpdateInput>
    /**
     * Choose, which AwardRecognition to update.
     */
    where: AwardRecognitionWhereUniqueInput
  }

  /**
   * AwardRecognition updateMany
   */
  export type AwardRecognitionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AwardRecognitions.
     */
    data: XOR<AwardRecognitionUpdateManyMutationInput, AwardRecognitionUncheckedUpdateManyInput>
    /**
     * Filter which AwardRecognitions to update
     */
    where?: AwardRecognitionWhereInput
    /**
     * Limit how many AwardRecognitions to update.
     */
    limit?: number
  }

  /**
   * AwardRecognition updateManyAndReturn
   */
  export type AwardRecognitionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * The data used to update AwardRecognitions.
     */
    data: XOR<AwardRecognitionUpdateManyMutationInput, AwardRecognitionUncheckedUpdateManyInput>
    /**
     * Filter which AwardRecognitions to update
     */
    where?: AwardRecognitionWhereInput
    /**
     * Limit how many AwardRecognitions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AwardRecognition upsert
   */
  export type AwardRecognitionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * The filter to search for the AwardRecognition to update in case it exists.
     */
    where: AwardRecognitionWhereUniqueInput
    /**
     * In case the AwardRecognition found by the `where` argument doesn't exist, create a new AwardRecognition with this data.
     */
    create: XOR<AwardRecognitionCreateInput, AwardRecognitionUncheckedCreateInput>
    /**
     * In case the AwardRecognition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AwardRecognitionUpdateInput, AwardRecognitionUncheckedUpdateInput>
  }

  /**
   * AwardRecognition delete
   */
  export type AwardRecognitionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
    /**
     * Filter which AwardRecognition to delete.
     */
    where: AwardRecognitionWhereUniqueInput
  }

  /**
   * AwardRecognition deleteMany
   */
  export type AwardRecognitionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardRecognitions to delete
     */
    where?: AwardRecognitionWhereInput
    /**
     * Limit how many AwardRecognitions to delete.
     */
    limit?: number
  }

  /**
   * AwardRecognition without action
   */
  export type AwardRecognitionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardRecognition
     */
    select?: AwardRecognitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AwardRecognition
     */
    omit?: AwardRecognitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardRecognitionInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalDevelopment
   */

  export type AggregateProfessionalDevelopment = {
    _count: ProfessionalDevelopmentCountAggregateOutputType | null
    _min: ProfessionalDevelopmentMinAggregateOutputType | null
    _max: ProfessionalDevelopmentMaxAggregateOutputType | null
  }

  export type ProfessionalDevelopmentMinAggregateOutputType = {
    id: string | null
    title: string | null
    organizer: string | null
    dateLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    certificateFileUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ProfessionalDevelopmentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    organizer: string | null
    dateLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    certificateFileUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ProfessionalDevelopmentCountAggregateOutputType = {
    id: number
    title: number
    organizer: number
    dateLocation: number
    createdAt: number
    updatedAt: number
    userId: number
    certificateFileUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type ProfessionalDevelopmentMinAggregateInputType = {
    id?: true
    title?: true
    organizer?: true
    dateLocation?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    certificateFileUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ProfessionalDevelopmentMaxAggregateInputType = {
    id?: true
    title?: true
    organizer?: true
    dateLocation?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    certificateFileUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ProfessionalDevelopmentCountAggregateInputType = {
    id?: true
    title?: true
    organizer?: true
    dateLocation?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    certificateFileUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type ProfessionalDevelopmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalDevelopment to aggregate.
     */
    where?: ProfessionalDevelopmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalDevelopments to fetch.
     */
    orderBy?: ProfessionalDevelopmentOrderByWithRelationInput | ProfessionalDevelopmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalDevelopmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalDevelopments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalDevelopments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalDevelopments
    **/
    _count?: true | ProfessionalDevelopmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalDevelopmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalDevelopmentMaxAggregateInputType
  }

  export type GetProfessionalDevelopmentAggregateType<T extends ProfessionalDevelopmentAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalDevelopment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalDevelopment[P]>
      : GetScalarType<T[P], AggregateProfessionalDevelopment[P]>
  }




  export type ProfessionalDevelopmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalDevelopmentWhereInput
    orderBy?: ProfessionalDevelopmentOrderByWithAggregationInput | ProfessionalDevelopmentOrderByWithAggregationInput[]
    by: ProfessionalDevelopmentScalarFieldEnum[] | ProfessionalDevelopmentScalarFieldEnum
    having?: ProfessionalDevelopmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalDevelopmentCountAggregateInputType | true
    _min?: ProfessionalDevelopmentMinAggregateInputType
    _max?: ProfessionalDevelopmentMaxAggregateInputType
  }

  export type ProfessionalDevelopmentGroupByOutputType = {
    id: string
    title: string
    organizer: string
    dateLocation: string
    createdAt: Date
    updatedAt: Date
    userId: string
    certificateFileUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: ProfessionalDevelopmentCountAggregateOutputType | null
    _min: ProfessionalDevelopmentMinAggregateOutputType | null
    _max: ProfessionalDevelopmentMaxAggregateOutputType | null
  }

  type GetProfessionalDevelopmentGroupByPayload<T extends ProfessionalDevelopmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalDevelopmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalDevelopmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalDevelopmentGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalDevelopmentGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalDevelopmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    organizer?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalDevelopment"]>

  export type ProfessionalDevelopmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    organizer?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalDevelopment"]>

  export type ProfessionalDevelopmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    organizer?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalDevelopment"]>

  export type ProfessionalDevelopmentSelectScalar = {
    id?: boolean
    title?: boolean
    organizer?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    certificateFileUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type ProfessionalDevelopmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "organizer" | "dateLocation" | "createdAt" | "updatedAt" | "userId" | "certificateFileUrl" | "status" | "rejectionReason", ExtArgs["result"]["professionalDevelopment"]>
  export type ProfessionalDevelopmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfessionalDevelopmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfessionalDevelopmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfessionalDevelopmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalDevelopment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      organizer: string
      dateLocation: string
      createdAt: Date
      updatedAt: Date
      userId: string
      certificateFileUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["professionalDevelopment"]>
    composites: {}
  }

  type ProfessionalDevelopmentGetPayload<S extends boolean | null | undefined | ProfessionalDevelopmentDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalDevelopmentPayload, S>

  type ProfessionalDevelopmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalDevelopmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalDevelopmentCountAggregateInputType | true
    }

  export interface ProfessionalDevelopmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalDevelopment'], meta: { name: 'ProfessionalDevelopment' } }
    /**
     * Find zero or one ProfessionalDevelopment that matches the filter.
     * @param {ProfessionalDevelopmentFindUniqueArgs} args - Arguments to find a ProfessionalDevelopment
     * @example
     * // Get one ProfessionalDevelopment
     * const professionalDevelopment = await prisma.professionalDevelopment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalDevelopmentFindUniqueArgs>(args: SelectSubset<T, ProfessionalDevelopmentFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalDevelopment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalDevelopmentFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalDevelopment
     * @example
     * // Get one ProfessionalDevelopment
     * const professionalDevelopment = await prisma.professionalDevelopment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalDevelopmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalDevelopmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalDevelopment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalDevelopmentFindFirstArgs} args - Arguments to find a ProfessionalDevelopment
     * @example
     * // Get one ProfessionalDevelopment
     * const professionalDevelopment = await prisma.professionalDevelopment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalDevelopmentFindFirstArgs>(args?: SelectSubset<T, ProfessionalDevelopmentFindFirstArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalDevelopment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalDevelopmentFindFirstOrThrowArgs} args - Arguments to find a ProfessionalDevelopment
     * @example
     * // Get one ProfessionalDevelopment
     * const professionalDevelopment = await prisma.professionalDevelopment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalDevelopmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalDevelopmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalDevelopments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalDevelopmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalDevelopments
     * const professionalDevelopments = await prisma.professionalDevelopment.findMany()
     * 
     * // Get first 10 ProfessionalDevelopments
     * const professionalDevelopments = await prisma.professionalDevelopment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalDevelopmentWithIdOnly = await prisma.professionalDevelopment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalDevelopmentFindManyArgs>(args?: SelectSubset<T, ProfessionalDevelopmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalDevelopment.
     * @param {ProfessionalDevelopmentCreateArgs} args - Arguments to create a ProfessionalDevelopment.
     * @example
     * // Create one ProfessionalDevelopment
     * const ProfessionalDevelopment = await prisma.professionalDevelopment.create({
     *   data: {
     *     // ... data to create a ProfessionalDevelopment
     *   }
     * })
     * 
     */
    create<T extends ProfessionalDevelopmentCreateArgs>(args: SelectSubset<T, ProfessionalDevelopmentCreateArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalDevelopments.
     * @param {ProfessionalDevelopmentCreateManyArgs} args - Arguments to create many ProfessionalDevelopments.
     * @example
     * // Create many ProfessionalDevelopments
     * const professionalDevelopment = await prisma.professionalDevelopment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalDevelopmentCreateManyArgs>(args?: SelectSubset<T, ProfessionalDevelopmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalDevelopments and returns the data saved in the database.
     * @param {ProfessionalDevelopmentCreateManyAndReturnArgs} args - Arguments to create many ProfessionalDevelopments.
     * @example
     * // Create many ProfessionalDevelopments
     * const professionalDevelopment = await prisma.professionalDevelopment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalDevelopments and only return the `id`
     * const professionalDevelopmentWithIdOnly = await prisma.professionalDevelopment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalDevelopmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalDevelopmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalDevelopment.
     * @param {ProfessionalDevelopmentDeleteArgs} args - Arguments to delete one ProfessionalDevelopment.
     * @example
     * // Delete one ProfessionalDevelopment
     * const ProfessionalDevelopment = await prisma.professionalDevelopment.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalDevelopment
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalDevelopmentDeleteArgs>(args: SelectSubset<T, ProfessionalDevelopmentDeleteArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalDevelopment.
     * @param {ProfessionalDevelopmentUpdateArgs} args - Arguments to update one ProfessionalDevelopment.
     * @example
     * // Update one ProfessionalDevelopment
     * const professionalDevelopment = await prisma.professionalDevelopment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalDevelopmentUpdateArgs>(args: SelectSubset<T, ProfessionalDevelopmentUpdateArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalDevelopments.
     * @param {ProfessionalDevelopmentDeleteManyArgs} args - Arguments to filter ProfessionalDevelopments to delete.
     * @example
     * // Delete a few ProfessionalDevelopments
     * const { count } = await prisma.professionalDevelopment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalDevelopmentDeleteManyArgs>(args?: SelectSubset<T, ProfessionalDevelopmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalDevelopments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalDevelopmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalDevelopments
     * const professionalDevelopment = await prisma.professionalDevelopment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalDevelopmentUpdateManyArgs>(args: SelectSubset<T, ProfessionalDevelopmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalDevelopments and returns the data updated in the database.
     * @param {ProfessionalDevelopmentUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalDevelopments.
     * @example
     * // Update many ProfessionalDevelopments
     * const professionalDevelopment = await prisma.professionalDevelopment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalDevelopments and only return the `id`
     * const professionalDevelopmentWithIdOnly = await prisma.professionalDevelopment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalDevelopmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalDevelopmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalDevelopment.
     * @param {ProfessionalDevelopmentUpsertArgs} args - Arguments to update or create a ProfessionalDevelopment.
     * @example
     * // Update or create a ProfessionalDevelopment
     * const professionalDevelopment = await prisma.professionalDevelopment.upsert({
     *   create: {
     *     // ... data to create a ProfessionalDevelopment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalDevelopment we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalDevelopmentUpsertArgs>(args: SelectSubset<T, ProfessionalDevelopmentUpsertArgs<ExtArgs>>): Prisma__ProfessionalDevelopmentClient<$Result.GetResult<Prisma.$ProfessionalDevelopmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalDevelopments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalDevelopmentCountArgs} args - Arguments to filter ProfessionalDevelopments to count.
     * @example
     * // Count the number of ProfessionalDevelopments
     * const count = await prisma.professionalDevelopment.count({
     *   where: {
     *     // ... the filter for the ProfessionalDevelopments we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalDevelopmentCountArgs>(
      args?: Subset<T, ProfessionalDevelopmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalDevelopmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalDevelopment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalDevelopmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalDevelopmentAggregateArgs>(args: Subset<T, ProfessionalDevelopmentAggregateArgs>): Prisma.PrismaPromise<GetProfessionalDevelopmentAggregateType<T>>

    /**
     * Group by ProfessionalDevelopment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalDevelopmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalDevelopmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalDevelopmentGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalDevelopmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalDevelopmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalDevelopmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalDevelopment model
   */
  readonly fields: ProfessionalDevelopmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalDevelopment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalDevelopmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalDevelopment model
   */
  interface ProfessionalDevelopmentFieldRefs {
    readonly id: FieldRef<"ProfessionalDevelopment", 'String'>
    readonly title: FieldRef<"ProfessionalDevelopment", 'String'>
    readonly organizer: FieldRef<"ProfessionalDevelopment", 'String'>
    readonly dateLocation: FieldRef<"ProfessionalDevelopment", 'String'>
    readonly createdAt: FieldRef<"ProfessionalDevelopment", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalDevelopment", 'DateTime'>
    readonly userId: FieldRef<"ProfessionalDevelopment", 'String'>
    readonly certificateFileUrl: FieldRef<"ProfessionalDevelopment", 'String'>
    readonly status: FieldRef<"ProfessionalDevelopment", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"ProfessionalDevelopment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalDevelopment findUnique
   */
  export type ProfessionalDevelopmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalDevelopment to fetch.
     */
    where: ProfessionalDevelopmentWhereUniqueInput
  }

  /**
   * ProfessionalDevelopment findUniqueOrThrow
   */
  export type ProfessionalDevelopmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalDevelopment to fetch.
     */
    where: ProfessionalDevelopmentWhereUniqueInput
  }

  /**
   * ProfessionalDevelopment findFirst
   */
  export type ProfessionalDevelopmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalDevelopment to fetch.
     */
    where?: ProfessionalDevelopmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalDevelopments to fetch.
     */
    orderBy?: ProfessionalDevelopmentOrderByWithRelationInput | ProfessionalDevelopmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalDevelopments.
     */
    cursor?: ProfessionalDevelopmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalDevelopments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalDevelopments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalDevelopments.
     */
    distinct?: ProfessionalDevelopmentScalarFieldEnum | ProfessionalDevelopmentScalarFieldEnum[]
  }

  /**
   * ProfessionalDevelopment findFirstOrThrow
   */
  export type ProfessionalDevelopmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalDevelopment to fetch.
     */
    where?: ProfessionalDevelopmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalDevelopments to fetch.
     */
    orderBy?: ProfessionalDevelopmentOrderByWithRelationInput | ProfessionalDevelopmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalDevelopments.
     */
    cursor?: ProfessionalDevelopmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalDevelopments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalDevelopments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalDevelopments.
     */
    distinct?: ProfessionalDevelopmentScalarFieldEnum | ProfessionalDevelopmentScalarFieldEnum[]
  }

  /**
   * ProfessionalDevelopment findMany
   */
  export type ProfessionalDevelopmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalDevelopments to fetch.
     */
    where?: ProfessionalDevelopmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalDevelopments to fetch.
     */
    orderBy?: ProfessionalDevelopmentOrderByWithRelationInput | ProfessionalDevelopmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalDevelopments.
     */
    cursor?: ProfessionalDevelopmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalDevelopments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalDevelopments.
     */
    skip?: number
    distinct?: ProfessionalDevelopmentScalarFieldEnum | ProfessionalDevelopmentScalarFieldEnum[]
  }

  /**
   * ProfessionalDevelopment create
   */
  export type ProfessionalDevelopmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalDevelopment.
     */
    data: XOR<ProfessionalDevelopmentCreateInput, ProfessionalDevelopmentUncheckedCreateInput>
  }

  /**
   * ProfessionalDevelopment createMany
   */
  export type ProfessionalDevelopmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalDevelopments.
     */
    data: ProfessionalDevelopmentCreateManyInput | ProfessionalDevelopmentCreateManyInput[]
  }

  /**
   * ProfessionalDevelopment createManyAndReturn
   */
  export type ProfessionalDevelopmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalDevelopments.
     */
    data: ProfessionalDevelopmentCreateManyInput | ProfessionalDevelopmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalDevelopment update
   */
  export type ProfessionalDevelopmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalDevelopment.
     */
    data: XOR<ProfessionalDevelopmentUpdateInput, ProfessionalDevelopmentUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalDevelopment to update.
     */
    where: ProfessionalDevelopmentWhereUniqueInput
  }

  /**
   * ProfessionalDevelopment updateMany
   */
  export type ProfessionalDevelopmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalDevelopments.
     */
    data: XOR<ProfessionalDevelopmentUpdateManyMutationInput, ProfessionalDevelopmentUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalDevelopments to update
     */
    where?: ProfessionalDevelopmentWhereInput
    /**
     * Limit how many ProfessionalDevelopments to update.
     */
    limit?: number
  }

  /**
   * ProfessionalDevelopment updateManyAndReturn
   */
  export type ProfessionalDevelopmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalDevelopments.
     */
    data: XOR<ProfessionalDevelopmentUpdateManyMutationInput, ProfessionalDevelopmentUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalDevelopments to update
     */
    where?: ProfessionalDevelopmentWhereInput
    /**
     * Limit how many ProfessionalDevelopments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalDevelopment upsert
   */
  export type ProfessionalDevelopmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalDevelopment to update in case it exists.
     */
    where: ProfessionalDevelopmentWhereUniqueInput
    /**
     * In case the ProfessionalDevelopment found by the `where` argument doesn't exist, create a new ProfessionalDevelopment with this data.
     */
    create: XOR<ProfessionalDevelopmentCreateInput, ProfessionalDevelopmentUncheckedCreateInput>
    /**
     * In case the ProfessionalDevelopment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalDevelopmentUpdateInput, ProfessionalDevelopmentUncheckedUpdateInput>
  }

  /**
   * ProfessionalDevelopment delete
   */
  export type ProfessionalDevelopmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalDevelopment to delete.
     */
    where: ProfessionalDevelopmentWhereUniqueInput
  }

  /**
   * ProfessionalDevelopment deleteMany
   */
  export type ProfessionalDevelopmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalDevelopments to delete
     */
    where?: ProfessionalDevelopmentWhereInput
    /**
     * Limit how many ProfessionalDevelopments to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalDevelopment without action
   */
  export type ProfessionalDevelopmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalDevelopment
     */
    select?: ProfessionalDevelopmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalDevelopment
     */
    omit?: ProfessionalDevelopmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalDevelopmentInclude<ExtArgs> | null
  }


  /**
   * Model CommunityInvolvement
   */

  export type AggregateCommunityInvolvement = {
    _count: CommunityInvolvementCountAggregateOutputType | null
    _min: CommunityInvolvementMinAggregateOutputType | null
    _max: CommunityInvolvementMaxAggregateOutputType | null
  }

  export type CommunityInvolvementMinAggregateOutputType = {
    id: string | null
    engagementTitle: string | null
    role: string | null
    locationDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    proofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type CommunityInvolvementMaxAggregateOutputType = {
    id: string | null
    engagementTitle: string | null
    role: string | null
    locationDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    proofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type CommunityInvolvementCountAggregateOutputType = {
    id: number
    engagementTitle: number
    role: number
    locationDate: number
    createdAt: number
    updatedAt: number
    userId: number
    proofUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type CommunityInvolvementMinAggregateInputType = {
    id?: true
    engagementTitle?: true
    role?: true
    locationDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type CommunityInvolvementMaxAggregateInputType = {
    id?: true
    engagementTitle?: true
    role?: true
    locationDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type CommunityInvolvementCountAggregateInputType = {
    id?: true
    engagementTitle?: true
    role?: true
    locationDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type CommunityInvolvementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityInvolvement to aggregate.
     */
    where?: CommunityInvolvementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityInvolvements to fetch.
     */
    orderBy?: CommunityInvolvementOrderByWithRelationInput | CommunityInvolvementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommunityInvolvementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityInvolvements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityInvolvements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommunityInvolvements
    **/
    _count?: true | CommunityInvolvementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommunityInvolvementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommunityInvolvementMaxAggregateInputType
  }

  export type GetCommunityInvolvementAggregateType<T extends CommunityInvolvementAggregateArgs> = {
        [P in keyof T & keyof AggregateCommunityInvolvement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommunityInvolvement[P]>
      : GetScalarType<T[P], AggregateCommunityInvolvement[P]>
  }




  export type CommunityInvolvementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityInvolvementWhereInput
    orderBy?: CommunityInvolvementOrderByWithAggregationInput | CommunityInvolvementOrderByWithAggregationInput[]
    by: CommunityInvolvementScalarFieldEnum[] | CommunityInvolvementScalarFieldEnum
    having?: CommunityInvolvementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommunityInvolvementCountAggregateInputType | true
    _min?: CommunityInvolvementMinAggregateInputType
    _max?: CommunityInvolvementMaxAggregateInputType
  }

  export type CommunityInvolvementGroupByOutputType = {
    id: string
    engagementTitle: string
    role: string
    locationDate: string
    createdAt: Date
    updatedAt: Date
    userId: string
    proofUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: CommunityInvolvementCountAggregateOutputType | null
    _min: CommunityInvolvementMinAggregateOutputType | null
    _max: CommunityInvolvementMaxAggregateOutputType | null
  }

  type GetCommunityInvolvementGroupByPayload<T extends CommunityInvolvementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommunityInvolvementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommunityInvolvementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommunityInvolvementGroupByOutputType[P]>
            : GetScalarType<T[P], CommunityInvolvementGroupByOutputType[P]>
        }
      >
    >


  export type CommunityInvolvementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementTitle?: boolean
    role?: boolean
    locationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communityInvolvement"]>

  export type CommunityInvolvementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementTitle?: boolean
    role?: boolean
    locationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communityInvolvement"]>

  export type CommunityInvolvementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementTitle?: boolean
    role?: boolean
    locationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communityInvolvement"]>

  export type CommunityInvolvementSelectScalar = {
    id?: boolean
    engagementTitle?: boolean
    role?: boolean
    locationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type CommunityInvolvementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementTitle" | "role" | "locationDate" | "createdAt" | "updatedAt" | "userId" | "proofUrl" | "status" | "rejectionReason", ExtArgs["result"]["communityInvolvement"]>
  export type CommunityInvolvementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommunityInvolvementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommunityInvolvementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommunityInvolvementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommunityInvolvement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementTitle: string
      role: string
      locationDate: string
      createdAt: Date
      updatedAt: Date
      userId: string
      proofUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["communityInvolvement"]>
    composites: {}
  }

  type CommunityInvolvementGetPayload<S extends boolean | null | undefined | CommunityInvolvementDefaultArgs> = $Result.GetResult<Prisma.$CommunityInvolvementPayload, S>

  type CommunityInvolvementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommunityInvolvementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommunityInvolvementCountAggregateInputType | true
    }

  export interface CommunityInvolvementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommunityInvolvement'], meta: { name: 'CommunityInvolvement' } }
    /**
     * Find zero or one CommunityInvolvement that matches the filter.
     * @param {CommunityInvolvementFindUniqueArgs} args - Arguments to find a CommunityInvolvement
     * @example
     * // Get one CommunityInvolvement
     * const communityInvolvement = await prisma.communityInvolvement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommunityInvolvementFindUniqueArgs>(args: SelectSubset<T, CommunityInvolvementFindUniqueArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommunityInvolvement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommunityInvolvementFindUniqueOrThrowArgs} args - Arguments to find a CommunityInvolvement
     * @example
     * // Get one CommunityInvolvement
     * const communityInvolvement = await prisma.communityInvolvement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommunityInvolvementFindUniqueOrThrowArgs>(args: SelectSubset<T, CommunityInvolvementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityInvolvement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityInvolvementFindFirstArgs} args - Arguments to find a CommunityInvolvement
     * @example
     * // Get one CommunityInvolvement
     * const communityInvolvement = await prisma.communityInvolvement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommunityInvolvementFindFirstArgs>(args?: SelectSubset<T, CommunityInvolvementFindFirstArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommunityInvolvement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityInvolvementFindFirstOrThrowArgs} args - Arguments to find a CommunityInvolvement
     * @example
     * // Get one CommunityInvolvement
     * const communityInvolvement = await prisma.communityInvolvement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommunityInvolvementFindFirstOrThrowArgs>(args?: SelectSubset<T, CommunityInvolvementFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommunityInvolvements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityInvolvementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommunityInvolvements
     * const communityInvolvements = await prisma.communityInvolvement.findMany()
     * 
     * // Get first 10 CommunityInvolvements
     * const communityInvolvements = await prisma.communityInvolvement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const communityInvolvementWithIdOnly = await prisma.communityInvolvement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommunityInvolvementFindManyArgs>(args?: SelectSubset<T, CommunityInvolvementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommunityInvolvement.
     * @param {CommunityInvolvementCreateArgs} args - Arguments to create a CommunityInvolvement.
     * @example
     * // Create one CommunityInvolvement
     * const CommunityInvolvement = await prisma.communityInvolvement.create({
     *   data: {
     *     // ... data to create a CommunityInvolvement
     *   }
     * })
     * 
     */
    create<T extends CommunityInvolvementCreateArgs>(args: SelectSubset<T, CommunityInvolvementCreateArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommunityInvolvements.
     * @param {CommunityInvolvementCreateManyArgs} args - Arguments to create many CommunityInvolvements.
     * @example
     * // Create many CommunityInvolvements
     * const communityInvolvement = await prisma.communityInvolvement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommunityInvolvementCreateManyArgs>(args?: SelectSubset<T, CommunityInvolvementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommunityInvolvements and returns the data saved in the database.
     * @param {CommunityInvolvementCreateManyAndReturnArgs} args - Arguments to create many CommunityInvolvements.
     * @example
     * // Create many CommunityInvolvements
     * const communityInvolvement = await prisma.communityInvolvement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommunityInvolvements and only return the `id`
     * const communityInvolvementWithIdOnly = await prisma.communityInvolvement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommunityInvolvementCreateManyAndReturnArgs>(args?: SelectSubset<T, CommunityInvolvementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CommunityInvolvement.
     * @param {CommunityInvolvementDeleteArgs} args - Arguments to delete one CommunityInvolvement.
     * @example
     * // Delete one CommunityInvolvement
     * const CommunityInvolvement = await prisma.communityInvolvement.delete({
     *   where: {
     *     // ... filter to delete one CommunityInvolvement
     *   }
     * })
     * 
     */
    delete<T extends CommunityInvolvementDeleteArgs>(args: SelectSubset<T, CommunityInvolvementDeleteArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommunityInvolvement.
     * @param {CommunityInvolvementUpdateArgs} args - Arguments to update one CommunityInvolvement.
     * @example
     * // Update one CommunityInvolvement
     * const communityInvolvement = await prisma.communityInvolvement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommunityInvolvementUpdateArgs>(args: SelectSubset<T, CommunityInvolvementUpdateArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommunityInvolvements.
     * @param {CommunityInvolvementDeleteManyArgs} args - Arguments to filter CommunityInvolvements to delete.
     * @example
     * // Delete a few CommunityInvolvements
     * const { count } = await prisma.communityInvolvement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommunityInvolvementDeleteManyArgs>(args?: SelectSubset<T, CommunityInvolvementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommunityInvolvements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityInvolvementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommunityInvolvements
     * const communityInvolvement = await prisma.communityInvolvement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommunityInvolvementUpdateManyArgs>(args: SelectSubset<T, CommunityInvolvementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommunityInvolvements and returns the data updated in the database.
     * @param {CommunityInvolvementUpdateManyAndReturnArgs} args - Arguments to update many CommunityInvolvements.
     * @example
     * // Update many CommunityInvolvements
     * const communityInvolvement = await prisma.communityInvolvement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommunityInvolvements and only return the `id`
     * const communityInvolvementWithIdOnly = await prisma.communityInvolvement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommunityInvolvementUpdateManyAndReturnArgs>(args: SelectSubset<T, CommunityInvolvementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CommunityInvolvement.
     * @param {CommunityInvolvementUpsertArgs} args - Arguments to update or create a CommunityInvolvement.
     * @example
     * // Update or create a CommunityInvolvement
     * const communityInvolvement = await prisma.communityInvolvement.upsert({
     *   create: {
     *     // ... data to create a CommunityInvolvement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommunityInvolvement we want to update
     *   }
     * })
     */
    upsert<T extends CommunityInvolvementUpsertArgs>(args: SelectSubset<T, CommunityInvolvementUpsertArgs<ExtArgs>>): Prisma__CommunityInvolvementClient<$Result.GetResult<Prisma.$CommunityInvolvementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommunityInvolvements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityInvolvementCountArgs} args - Arguments to filter CommunityInvolvements to count.
     * @example
     * // Count the number of CommunityInvolvements
     * const count = await prisma.communityInvolvement.count({
     *   where: {
     *     // ... the filter for the CommunityInvolvements we want to count
     *   }
     * })
    **/
    count<T extends CommunityInvolvementCountArgs>(
      args?: Subset<T, CommunityInvolvementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommunityInvolvementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommunityInvolvement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityInvolvementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommunityInvolvementAggregateArgs>(args: Subset<T, CommunityInvolvementAggregateArgs>): Prisma.PrismaPromise<GetCommunityInvolvementAggregateType<T>>

    /**
     * Group by CommunityInvolvement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityInvolvementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommunityInvolvementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommunityInvolvementGroupByArgs['orderBy'] }
        : { orderBy?: CommunityInvolvementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommunityInvolvementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityInvolvementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommunityInvolvement model
   */
  readonly fields: CommunityInvolvementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommunityInvolvement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommunityInvolvementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommunityInvolvement model
   */
  interface CommunityInvolvementFieldRefs {
    readonly id: FieldRef<"CommunityInvolvement", 'String'>
    readonly engagementTitle: FieldRef<"CommunityInvolvement", 'String'>
    readonly role: FieldRef<"CommunityInvolvement", 'String'>
    readonly locationDate: FieldRef<"CommunityInvolvement", 'String'>
    readonly createdAt: FieldRef<"CommunityInvolvement", 'DateTime'>
    readonly updatedAt: FieldRef<"CommunityInvolvement", 'DateTime'>
    readonly userId: FieldRef<"CommunityInvolvement", 'String'>
    readonly proofUrl: FieldRef<"CommunityInvolvement", 'String'>
    readonly status: FieldRef<"CommunityInvolvement", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"CommunityInvolvement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CommunityInvolvement findUnique
   */
  export type CommunityInvolvementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * Filter, which CommunityInvolvement to fetch.
     */
    where: CommunityInvolvementWhereUniqueInput
  }

  /**
   * CommunityInvolvement findUniqueOrThrow
   */
  export type CommunityInvolvementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * Filter, which CommunityInvolvement to fetch.
     */
    where: CommunityInvolvementWhereUniqueInput
  }

  /**
   * CommunityInvolvement findFirst
   */
  export type CommunityInvolvementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * Filter, which CommunityInvolvement to fetch.
     */
    where?: CommunityInvolvementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityInvolvements to fetch.
     */
    orderBy?: CommunityInvolvementOrderByWithRelationInput | CommunityInvolvementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityInvolvements.
     */
    cursor?: CommunityInvolvementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityInvolvements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityInvolvements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityInvolvements.
     */
    distinct?: CommunityInvolvementScalarFieldEnum | CommunityInvolvementScalarFieldEnum[]
  }

  /**
   * CommunityInvolvement findFirstOrThrow
   */
  export type CommunityInvolvementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * Filter, which CommunityInvolvement to fetch.
     */
    where?: CommunityInvolvementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityInvolvements to fetch.
     */
    orderBy?: CommunityInvolvementOrderByWithRelationInput | CommunityInvolvementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityInvolvements.
     */
    cursor?: CommunityInvolvementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityInvolvements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityInvolvements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityInvolvements.
     */
    distinct?: CommunityInvolvementScalarFieldEnum | CommunityInvolvementScalarFieldEnum[]
  }

  /**
   * CommunityInvolvement findMany
   */
  export type CommunityInvolvementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * Filter, which CommunityInvolvements to fetch.
     */
    where?: CommunityInvolvementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityInvolvements to fetch.
     */
    orderBy?: CommunityInvolvementOrderByWithRelationInput | CommunityInvolvementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommunityInvolvements.
     */
    cursor?: CommunityInvolvementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityInvolvements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityInvolvements.
     */
    skip?: number
    distinct?: CommunityInvolvementScalarFieldEnum | CommunityInvolvementScalarFieldEnum[]
  }

  /**
   * CommunityInvolvement create
   */
  export type CommunityInvolvementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * The data needed to create a CommunityInvolvement.
     */
    data: XOR<CommunityInvolvementCreateInput, CommunityInvolvementUncheckedCreateInput>
  }

  /**
   * CommunityInvolvement createMany
   */
  export type CommunityInvolvementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommunityInvolvements.
     */
    data: CommunityInvolvementCreateManyInput | CommunityInvolvementCreateManyInput[]
  }

  /**
   * CommunityInvolvement createManyAndReturn
   */
  export type CommunityInvolvementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * The data used to create many CommunityInvolvements.
     */
    data: CommunityInvolvementCreateManyInput | CommunityInvolvementCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommunityInvolvement update
   */
  export type CommunityInvolvementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * The data needed to update a CommunityInvolvement.
     */
    data: XOR<CommunityInvolvementUpdateInput, CommunityInvolvementUncheckedUpdateInput>
    /**
     * Choose, which CommunityInvolvement to update.
     */
    where: CommunityInvolvementWhereUniqueInput
  }

  /**
   * CommunityInvolvement updateMany
   */
  export type CommunityInvolvementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommunityInvolvements.
     */
    data: XOR<CommunityInvolvementUpdateManyMutationInput, CommunityInvolvementUncheckedUpdateManyInput>
    /**
     * Filter which CommunityInvolvements to update
     */
    where?: CommunityInvolvementWhereInput
    /**
     * Limit how many CommunityInvolvements to update.
     */
    limit?: number
  }

  /**
   * CommunityInvolvement updateManyAndReturn
   */
  export type CommunityInvolvementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * The data used to update CommunityInvolvements.
     */
    data: XOR<CommunityInvolvementUpdateManyMutationInput, CommunityInvolvementUncheckedUpdateManyInput>
    /**
     * Filter which CommunityInvolvements to update
     */
    where?: CommunityInvolvementWhereInput
    /**
     * Limit how many CommunityInvolvements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommunityInvolvement upsert
   */
  export type CommunityInvolvementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * The filter to search for the CommunityInvolvement to update in case it exists.
     */
    where: CommunityInvolvementWhereUniqueInput
    /**
     * In case the CommunityInvolvement found by the `where` argument doesn't exist, create a new CommunityInvolvement with this data.
     */
    create: XOR<CommunityInvolvementCreateInput, CommunityInvolvementUncheckedCreateInput>
    /**
     * In case the CommunityInvolvement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommunityInvolvementUpdateInput, CommunityInvolvementUncheckedUpdateInput>
  }

  /**
   * CommunityInvolvement delete
   */
  export type CommunityInvolvementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
    /**
     * Filter which CommunityInvolvement to delete.
     */
    where: CommunityInvolvementWhereUniqueInput
  }

  /**
   * CommunityInvolvement deleteMany
   */
  export type CommunityInvolvementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityInvolvements to delete
     */
    where?: CommunityInvolvementWhereInput
    /**
     * Limit how many CommunityInvolvements to delete.
     */
    limit?: number
  }

  /**
   * CommunityInvolvement without action
   */
  export type CommunityInvolvementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityInvolvement
     */
    select?: CommunityInvolvementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommunityInvolvement
     */
    omit?: CommunityInvolvementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInvolvementInclude<ExtArgs> | null
  }


  /**
   * Model Publication
   */

  export type AggregatePublication = {
    _count: PublicationCountAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  export type PublicationMinAggregateOutputType = {
    id: string | null
    researchTitle: string | null
    journal: string | null
    datePublished: Date | null
    doiLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    pdfUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type PublicationMaxAggregateOutputType = {
    id: string | null
    researchTitle: string | null
    journal: string | null
    datePublished: Date | null
    doiLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    pdfUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type PublicationCountAggregateOutputType = {
    id: number
    researchTitle: number
    journal: number
    datePublished: number
    doiLink: number
    createdAt: number
    updatedAt: number
    userId: number
    pdfUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type PublicationMinAggregateInputType = {
    id?: true
    researchTitle?: true
    journal?: true
    datePublished?: true
    doiLink?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    pdfUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type PublicationMaxAggregateInputType = {
    id?: true
    researchTitle?: true
    journal?: true
    datePublished?: true
    doiLink?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    pdfUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type PublicationCountAggregateInputType = {
    id?: true
    researchTitle?: true
    journal?: true
    datePublished?: true
    doiLink?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    pdfUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type PublicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publication to aggregate.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Publications
    **/
    _count?: true | PublicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicationMaxAggregateInputType
  }

  export type GetPublicationAggregateType<T extends PublicationAggregateArgs> = {
        [P in keyof T & keyof AggregatePublication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublication[P]>
      : GetScalarType<T[P], AggregatePublication[P]>
  }




  export type PublicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicationWhereInput
    orderBy?: PublicationOrderByWithAggregationInput | PublicationOrderByWithAggregationInput[]
    by: PublicationScalarFieldEnum[] | PublicationScalarFieldEnum
    having?: PublicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicationCountAggregateInputType | true
    _min?: PublicationMinAggregateInputType
    _max?: PublicationMaxAggregateInputType
  }

  export type PublicationGroupByOutputType = {
    id: string
    researchTitle: string
    journal: string
    datePublished: Date
    doiLink: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    pdfUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: PublicationCountAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  type GetPublicationGroupByPayload<T extends PublicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicationGroupByOutputType[P]>
            : GetScalarType<T[P], PublicationGroupByOutputType[P]>
        }
      >
    >


  export type PublicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    researchTitle?: boolean
    journal?: boolean
    datePublished?: boolean
    doiLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    pdfUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    researchTitle?: boolean
    journal?: boolean
    datePublished?: boolean
    doiLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    pdfUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    researchTitle?: boolean
    journal?: boolean
    datePublished?: boolean
    doiLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    pdfUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectScalar = {
    id?: boolean
    researchTitle?: boolean
    journal?: boolean
    datePublished?: boolean
    doiLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    pdfUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type PublicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "researchTitle" | "journal" | "datePublished" | "doiLink" | "createdAt" | "updatedAt" | "userId" | "pdfUrl" | "status" | "rejectionReason", ExtArgs["result"]["publication"]>
  export type PublicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PublicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PublicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PublicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Publication"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      researchTitle: string
      journal: string
      datePublished: Date
      doiLink: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
      pdfUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["publication"]>
    composites: {}
  }

  type PublicationGetPayload<S extends boolean | null | undefined | PublicationDefaultArgs> = $Result.GetResult<Prisma.$PublicationPayload, S>

  type PublicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicationCountAggregateInputType | true
    }

  export interface PublicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Publication'], meta: { name: 'Publication' } }
    /**
     * Find zero or one Publication that matches the filter.
     * @param {PublicationFindUniqueArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicationFindUniqueArgs>(args: SelectSubset<T, PublicationFindUniqueArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Publication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicationFindUniqueOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicationFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicationFindFirstArgs>(args?: SelectSubset<T, PublicationFindFirstArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicationFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Publications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Publications
     * const publications = await prisma.publication.findMany()
     * 
     * // Get first 10 Publications
     * const publications = await prisma.publication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicationWithIdOnly = await prisma.publication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicationFindManyArgs>(args?: SelectSubset<T, PublicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Publication.
     * @param {PublicationCreateArgs} args - Arguments to create a Publication.
     * @example
     * // Create one Publication
     * const Publication = await prisma.publication.create({
     *   data: {
     *     // ... data to create a Publication
     *   }
     * })
     * 
     */
    create<T extends PublicationCreateArgs>(args: SelectSubset<T, PublicationCreateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Publications.
     * @param {PublicationCreateManyArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publication = await prisma.publication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicationCreateManyArgs>(args?: SelectSubset<T, PublicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Publications and returns the data saved in the database.
     * @param {PublicationCreateManyAndReturnArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publication = await prisma.publication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Publications and only return the `id`
     * const publicationWithIdOnly = await prisma.publication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicationCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Publication.
     * @param {PublicationDeleteArgs} args - Arguments to delete one Publication.
     * @example
     * // Delete one Publication
     * const Publication = await prisma.publication.delete({
     *   where: {
     *     // ... filter to delete one Publication
     *   }
     * })
     * 
     */
    delete<T extends PublicationDeleteArgs>(args: SelectSubset<T, PublicationDeleteArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Publication.
     * @param {PublicationUpdateArgs} args - Arguments to update one Publication.
     * @example
     * // Update one Publication
     * const publication = await prisma.publication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicationUpdateArgs>(args: SelectSubset<T, PublicationUpdateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Publications.
     * @param {PublicationDeleteManyArgs} args - Arguments to filter Publications to delete.
     * @example
     * // Delete a few Publications
     * const { count } = await prisma.publication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicationDeleteManyArgs>(args?: SelectSubset<T, PublicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Publications
     * const publication = await prisma.publication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicationUpdateManyArgs>(args: SelectSubset<T, PublicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications and returns the data updated in the database.
     * @param {PublicationUpdateManyAndReturnArgs} args - Arguments to update many Publications.
     * @example
     * // Update many Publications
     * const publication = await prisma.publication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Publications and only return the `id`
     * const publicationWithIdOnly = await prisma.publication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PublicationUpdateManyAndReturnArgs>(args: SelectSubset<T, PublicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Publication.
     * @param {PublicationUpsertArgs} args - Arguments to update or create a Publication.
     * @example
     * // Update or create a Publication
     * const publication = await prisma.publication.upsert({
     *   create: {
     *     // ... data to create a Publication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Publication we want to update
     *   }
     * })
     */
    upsert<T extends PublicationUpsertArgs>(args: SelectSubset<T, PublicationUpsertArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationCountArgs} args - Arguments to filter Publications to count.
     * @example
     * // Count the number of Publications
     * const count = await prisma.publication.count({
     *   where: {
     *     // ... the filter for the Publications we want to count
     *   }
     * })
    **/
    count<T extends PublicationCountArgs>(
      args?: Subset<T, PublicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicationAggregateArgs>(args: Subset<T, PublicationAggregateArgs>): Prisma.PrismaPromise<GetPublicationAggregateType<T>>

    /**
     * Group by Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PublicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicationGroupByArgs['orderBy'] }
        : { orderBy?: PublicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PublicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Publication model
   */
  readonly fields: PublicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Publication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Publication model
   */
  interface PublicationFieldRefs {
    readonly id: FieldRef<"Publication", 'String'>
    readonly researchTitle: FieldRef<"Publication", 'String'>
    readonly journal: FieldRef<"Publication", 'String'>
    readonly datePublished: FieldRef<"Publication", 'DateTime'>
    readonly doiLink: FieldRef<"Publication", 'String'>
    readonly createdAt: FieldRef<"Publication", 'DateTime'>
    readonly updatedAt: FieldRef<"Publication", 'DateTime'>
    readonly userId: FieldRef<"Publication", 'String'>
    readonly pdfUrl: FieldRef<"Publication", 'String'>
    readonly status: FieldRef<"Publication", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"Publication", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Publication findUnique
   */
  export type PublicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findUniqueOrThrow
   */
  export type PublicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findFirst
   */
  export type PublicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findFirstOrThrow
   */
  export type PublicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findMany
   */
  export type PublicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publications to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication create
   */
  export type PublicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Publication.
     */
    data: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
  }

  /**
   * Publication createMany
   */
  export type PublicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Publications.
     */
    data: PublicationCreateManyInput | PublicationCreateManyInput[]
  }

  /**
   * Publication createManyAndReturn
   */
  export type PublicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data used to create many Publications.
     */
    data: PublicationCreateManyInput | PublicationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Publication update
   */
  export type PublicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Publication.
     */
    data: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
    /**
     * Choose, which Publication to update.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication updateMany
   */
  export type PublicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Publications.
     */
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyInput>
    /**
     * Filter which Publications to update
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to update.
     */
    limit?: number
  }

  /**
   * Publication updateManyAndReturn
   */
  export type PublicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data used to update Publications.
     */
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyInput>
    /**
     * Filter which Publications to update
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Publication upsert
   */
  export type PublicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Publication to update in case it exists.
     */
    where: PublicationWhereUniqueInput
    /**
     * In case the Publication found by the `where` argument doesn't exist, create a new Publication with this data.
     */
    create: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
    /**
     * In case the Publication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
  }

  /**
   * Publication delete
   */
  export type PublicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter which Publication to delete.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication deleteMany
   */
  export type PublicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publications to delete
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to delete.
     */
    limit?: number
  }

  /**
   * Publication without action
   */
  export type PublicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
  }


  /**
   * Model ConferencePresentation
   */

  export type AggregateConferencePresentation = {
    _count: ConferencePresentationCountAggregateOutputType | null
    _min: ConferencePresentationMinAggregateOutputType | null
    _max: ConferencePresentationMaxAggregateOutputType | null
  }

  export type ConferencePresentationMinAggregateOutputType = {
    id: string | null
    paperTitle: string | null
    eventName: string | null
    dateLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    proofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ConferencePresentationMaxAggregateOutputType = {
    id: string | null
    paperTitle: string | null
    eventName: string | null
    dateLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    proofUrl: string | null
    status: $Enums.ApprovalStatus | null
    rejectionReason: string | null
  }

  export type ConferencePresentationCountAggregateOutputType = {
    id: number
    paperTitle: number
    eventName: number
    dateLocation: number
    createdAt: number
    updatedAt: number
    userId: number
    proofUrl: number
    status: number
    rejectionReason: number
    _all: number
  }


  export type ConferencePresentationMinAggregateInputType = {
    id?: true
    paperTitle?: true
    eventName?: true
    dateLocation?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ConferencePresentationMaxAggregateInputType = {
    id?: true
    paperTitle?: true
    eventName?: true
    dateLocation?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
  }

  export type ConferencePresentationCountAggregateInputType = {
    id?: true
    paperTitle?: true
    eventName?: true
    dateLocation?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    proofUrl?: true
    status?: true
    rejectionReason?: true
    _all?: true
  }

  export type ConferencePresentationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConferencePresentation to aggregate.
     */
    where?: ConferencePresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConferencePresentations to fetch.
     */
    orderBy?: ConferencePresentationOrderByWithRelationInput | ConferencePresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConferencePresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConferencePresentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConferencePresentations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConferencePresentations
    **/
    _count?: true | ConferencePresentationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConferencePresentationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConferencePresentationMaxAggregateInputType
  }

  export type GetConferencePresentationAggregateType<T extends ConferencePresentationAggregateArgs> = {
        [P in keyof T & keyof AggregateConferencePresentation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConferencePresentation[P]>
      : GetScalarType<T[P], AggregateConferencePresentation[P]>
  }




  export type ConferencePresentationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConferencePresentationWhereInput
    orderBy?: ConferencePresentationOrderByWithAggregationInput | ConferencePresentationOrderByWithAggregationInput[]
    by: ConferencePresentationScalarFieldEnum[] | ConferencePresentationScalarFieldEnum
    having?: ConferencePresentationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConferencePresentationCountAggregateInputType | true
    _min?: ConferencePresentationMinAggregateInputType
    _max?: ConferencePresentationMaxAggregateInputType
  }

  export type ConferencePresentationGroupByOutputType = {
    id: string
    paperTitle: string
    eventName: string
    dateLocation: string
    createdAt: Date
    updatedAt: Date
    userId: string
    proofUrl: string | null
    status: $Enums.ApprovalStatus
    rejectionReason: string | null
    _count: ConferencePresentationCountAggregateOutputType | null
    _min: ConferencePresentationMinAggregateOutputType | null
    _max: ConferencePresentationMaxAggregateOutputType | null
  }

  type GetConferencePresentationGroupByPayload<T extends ConferencePresentationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConferencePresentationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConferencePresentationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConferencePresentationGroupByOutputType[P]>
            : GetScalarType<T[P], ConferencePresentationGroupByOutputType[P]>
        }
      >
    >


  export type ConferencePresentationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperTitle?: boolean
    eventName?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conferencePresentation"]>

  export type ConferencePresentationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperTitle?: boolean
    eventName?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conferencePresentation"]>

  export type ConferencePresentationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperTitle?: boolean
    eventName?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conferencePresentation"]>

  export type ConferencePresentationSelectScalar = {
    id?: boolean
    paperTitle?: boolean
    eventName?: boolean
    dateLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    proofUrl?: boolean
    status?: boolean
    rejectionReason?: boolean
  }

  export type ConferencePresentationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paperTitle" | "eventName" | "dateLocation" | "createdAt" | "updatedAt" | "userId" | "proofUrl" | "status" | "rejectionReason", ExtArgs["result"]["conferencePresentation"]>
  export type ConferencePresentationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConferencePresentationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConferencePresentationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConferencePresentationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConferencePresentation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paperTitle: string
      eventName: string
      dateLocation: string
      createdAt: Date
      updatedAt: Date
      userId: string
      proofUrl: string | null
      status: $Enums.ApprovalStatus
      rejectionReason: string | null
    }, ExtArgs["result"]["conferencePresentation"]>
    composites: {}
  }

  type ConferencePresentationGetPayload<S extends boolean | null | undefined | ConferencePresentationDefaultArgs> = $Result.GetResult<Prisma.$ConferencePresentationPayload, S>

  type ConferencePresentationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConferencePresentationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConferencePresentationCountAggregateInputType | true
    }

  export interface ConferencePresentationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConferencePresentation'], meta: { name: 'ConferencePresentation' } }
    /**
     * Find zero or one ConferencePresentation that matches the filter.
     * @param {ConferencePresentationFindUniqueArgs} args - Arguments to find a ConferencePresentation
     * @example
     * // Get one ConferencePresentation
     * const conferencePresentation = await prisma.conferencePresentation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConferencePresentationFindUniqueArgs>(args: SelectSubset<T, ConferencePresentationFindUniqueArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConferencePresentation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConferencePresentationFindUniqueOrThrowArgs} args - Arguments to find a ConferencePresentation
     * @example
     * // Get one ConferencePresentation
     * const conferencePresentation = await prisma.conferencePresentation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConferencePresentationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConferencePresentationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConferencePresentation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencePresentationFindFirstArgs} args - Arguments to find a ConferencePresentation
     * @example
     * // Get one ConferencePresentation
     * const conferencePresentation = await prisma.conferencePresentation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConferencePresentationFindFirstArgs>(args?: SelectSubset<T, ConferencePresentationFindFirstArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConferencePresentation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencePresentationFindFirstOrThrowArgs} args - Arguments to find a ConferencePresentation
     * @example
     * // Get one ConferencePresentation
     * const conferencePresentation = await prisma.conferencePresentation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConferencePresentationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConferencePresentationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConferencePresentations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencePresentationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConferencePresentations
     * const conferencePresentations = await prisma.conferencePresentation.findMany()
     * 
     * // Get first 10 ConferencePresentations
     * const conferencePresentations = await prisma.conferencePresentation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conferencePresentationWithIdOnly = await prisma.conferencePresentation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConferencePresentationFindManyArgs>(args?: SelectSubset<T, ConferencePresentationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConferencePresentation.
     * @param {ConferencePresentationCreateArgs} args - Arguments to create a ConferencePresentation.
     * @example
     * // Create one ConferencePresentation
     * const ConferencePresentation = await prisma.conferencePresentation.create({
     *   data: {
     *     // ... data to create a ConferencePresentation
     *   }
     * })
     * 
     */
    create<T extends ConferencePresentationCreateArgs>(args: SelectSubset<T, ConferencePresentationCreateArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConferencePresentations.
     * @param {ConferencePresentationCreateManyArgs} args - Arguments to create many ConferencePresentations.
     * @example
     * // Create many ConferencePresentations
     * const conferencePresentation = await prisma.conferencePresentation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConferencePresentationCreateManyArgs>(args?: SelectSubset<T, ConferencePresentationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConferencePresentations and returns the data saved in the database.
     * @param {ConferencePresentationCreateManyAndReturnArgs} args - Arguments to create many ConferencePresentations.
     * @example
     * // Create many ConferencePresentations
     * const conferencePresentation = await prisma.conferencePresentation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConferencePresentations and only return the `id`
     * const conferencePresentationWithIdOnly = await prisma.conferencePresentation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConferencePresentationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConferencePresentationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConferencePresentation.
     * @param {ConferencePresentationDeleteArgs} args - Arguments to delete one ConferencePresentation.
     * @example
     * // Delete one ConferencePresentation
     * const ConferencePresentation = await prisma.conferencePresentation.delete({
     *   where: {
     *     // ... filter to delete one ConferencePresentation
     *   }
     * })
     * 
     */
    delete<T extends ConferencePresentationDeleteArgs>(args: SelectSubset<T, ConferencePresentationDeleteArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConferencePresentation.
     * @param {ConferencePresentationUpdateArgs} args - Arguments to update one ConferencePresentation.
     * @example
     * // Update one ConferencePresentation
     * const conferencePresentation = await prisma.conferencePresentation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConferencePresentationUpdateArgs>(args: SelectSubset<T, ConferencePresentationUpdateArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConferencePresentations.
     * @param {ConferencePresentationDeleteManyArgs} args - Arguments to filter ConferencePresentations to delete.
     * @example
     * // Delete a few ConferencePresentations
     * const { count } = await prisma.conferencePresentation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConferencePresentationDeleteManyArgs>(args?: SelectSubset<T, ConferencePresentationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConferencePresentations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencePresentationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConferencePresentations
     * const conferencePresentation = await prisma.conferencePresentation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConferencePresentationUpdateManyArgs>(args: SelectSubset<T, ConferencePresentationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConferencePresentations and returns the data updated in the database.
     * @param {ConferencePresentationUpdateManyAndReturnArgs} args - Arguments to update many ConferencePresentations.
     * @example
     * // Update many ConferencePresentations
     * const conferencePresentation = await prisma.conferencePresentation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConferencePresentations and only return the `id`
     * const conferencePresentationWithIdOnly = await prisma.conferencePresentation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConferencePresentationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConferencePresentationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConferencePresentation.
     * @param {ConferencePresentationUpsertArgs} args - Arguments to update or create a ConferencePresentation.
     * @example
     * // Update or create a ConferencePresentation
     * const conferencePresentation = await prisma.conferencePresentation.upsert({
     *   create: {
     *     // ... data to create a ConferencePresentation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConferencePresentation we want to update
     *   }
     * })
     */
    upsert<T extends ConferencePresentationUpsertArgs>(args: SelectSubset<T, ConferencePresentationUpsertArgs<ExtArgs>>): Prisma__ConferencePresentationClient<$Result.GetResult<Prisma.$ConferencePresentationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConferencePresentations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencePresentationCountArgs} args - Arguments to filter ConferencePresentations to count.
     * @example
     * // Count the number of ConferencePresentations
     * const count = await prisma.conferencePresentation.count({
     *   where: {
     *     // ... the filter for the ConferencePresentations we want to count
     *   }
     * })
    **/
    count<T extends ConferencePresentationCountArgs>(
      args?: Subset<T, ConferencePresentationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConferencePresentationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConferencePresentation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencePresentationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConferencePresentationAggregateArgs>(args: Subset<T, ConferencePresentationAggregateArgs>): Prisma.PrismaPromise<GetConferencePresentationAggregateType<T>>

    /**
     * Group by ConferencePresentation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferencePresentationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConferencePresentationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConferencePresentationGroupByArgs['orderBy'] }
        : { orderBy?: ConferencePresentationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConferencePresentationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConferencePresentationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConferencePresentation model
   */
  readonly fields: ConferencePresentationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConferencePresentation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConferencePresentationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConferencePresentation model
   */
  interface ConferencePresentationFieldRefs {
    readonly id: FieldRef<"ConferencePresentation", 'String'>
    readonly paperTitle: FieldRef<"ConferencePresentation", 'String'>
    readonly eventName: FieldRef<"ConferencePresentation", 'String'>
    readonly dateLocation: FieldRef<"ConferencePresentation", 'String'>
    readonly createdAt: FieldRef<"ConferencePresentation", 'DateTime'>
    readonly updatedAt: FieldRef<"ConferencePresentation", 'DateTime'>
    readonly userId: FieldRef<"ConferencePresentation", 'String'>
    readonly proofUrl: FieldRef<"ConferencePresentation", 'String'>
    readonly status: FieldRef<"ConferencePresentation", 'ApprovalStatus'>
    readonly rejectionReason: FieldRef<"ConferencePresentation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ConferencePresentation findUnique
   */
  export type ConferencePresentationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * Filter, which ConferencePresentation to fetch.
     */
    where: ConferencePresentationWhereUniqueInput
  }

  /**
   * ConferencePresentation findUniqueOrThrow
   */
  export type ConferencePresentationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * Filter, which ConferencePresentation to fetch.
     */
    where: ConferencePresentationWhereUniqueInput
  }

  /**
   * ConferencePresentation findFirst
   */
  export type ConferencePresentationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * Filter, which ConferencePresentation to fetch.
     */
    where?: ConferencePresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConferencePresentations to fetch.
     */
    orderBy?: ConferencePresentationOrderByWithRelationInput | ConferencePresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConferencePresentations.
     */
    cursor?: ConferencePresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConferencePresentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConferencePresentations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConferencePresentations.
     */
    distinct?: ConferencePresentationScalarFieldEnum | ConferencePresentationScalarFieldEnum[]
  }

  /**
   * ConferencePresentation findFirstOrThrow
   */
  export type ConferencePresentationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * Filter, which ConferencePresentation to fetch.
     */
    where?: ConferencePresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConferencePresentations to fetch.
     */
    orderBy?: ConferencePresentationOrderByWithRelationInput | ConferencePresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConferencePresentations.
     */
    cursor?: ConferencePresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConferencePresentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConferencePresentations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConferencePresentations.
     */
    distinct?: ConferencePresentationScalarFieldEnum | ConferencePresentationScalarFieldEnum[]
  }

  /**
   * ConferencePresentation findMany
   */
  export type ConferencePresentationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * Filter, which ConferencePresentations to fetch.
     */
    where?: ConferencePresentationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConferencePresentations to fetch.
     */
    orderBy?: ConferencePresentationOrderByWithRelationInput | ConferencePresentationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConferencePresentations.
     */
    cursor?: ConferencePresentationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConferencePresentations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConferencePresentations.
     */
    skip?: number
    distinct?: ConferencePresentationScalarFieldEnum | ConferencePresentationScalarFieldEnum[]
  }

  /**
   * ConferencePresentation create
   */
  export type ConferencePresentationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * The data needed to create a ConferencePresentation.
     */
    data: XOR<ConferencePresentationCreateInput, ConferencePresentationUncheckedCreateInput>
  }

  /**
   * ConferencePresentation createMany
   */
  export type ConferencePresentationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConferencePresentations.
     */
    data: ConferencePresentationCreateManyInput | ConferencePresentationCreateManyInput[]
  }

  /**
   * ConferencePresentation createManyAndReturn
   */
  export type ConferencePresentationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * The data used to create many ConferencePresentations.
     */
    data: ConferencePresentationCreateManyInput | ConferencePresentationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConferencePresentation update
   */
  export type ConferencePresentationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * The data needed to update a ConferencePresentation.
     */
    data: XOR<ConferencePresentationUpdateInput, ConferencePresentationUncheckedUpdateInput>
    /**
     * Choose, which ConferencePresentation to update.
     */
    where: ConferencePresentationWhereUniqueInput
  }

  /**
   * ConferencePresentation updateMany
   */
  export type ConferencePresentationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConferencePresentations.
     */
    data: XOR<ConferencePresentationUpdateManyMutationInput, ConferencePresentationUncheckedUpdateManyInput>
    /**
     * Filter which ConferencePresentations to update
     */
    where?: ConferencePresentationWhereInput
    /**
     * Limit how many ConferencePresentations to update.
     */
    limit?: number
  }

  /**
   * ConferencePresentation updateManyAndReturn
   */
  export type ConferencePresentationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * The data used to update ConferencePresentations.
     */
    data: XOR<ConferencePresentationUpdateManyMutationInput, ConferencePresentationUncheckedUpdateManyInput>
    /**
     * Filter which ConferencePresentations to update
     */
    where?: ConferencePresentationWhereInput
    /**
     * Limit how many ConferencePresentations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConferencePresentation upsert
   */
  export type ConferencePresentationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * The filter to search for the ConferencePresentation to update in case it exists.
     */
    where: ConferencePresentationWhereUniqueInput
    /**
     * In case the ConferencePresentation found by the `where` argument doesn't exist, create a new ConferencePresentation with this data.
     */
    create: XOR<ConferencePresentationCreateInput, ConferencePresentationUncheckedCreateInput>
    /**
     * In case the ConferencePresentation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConferencePresentationUpdateInput, ConferencePresentationUncheckedUpdateInput>
  }

  /**
   * ConferencePresentation delete
   */
  export type ConferencePresentationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
    /**
     * Filter which ConferencePresentation to delete.
     */
    where: ConferencePresentationWhereUniqueInput
  }

  /**
   * ConferencePresentation deleteMany
   */
  export type ConferencePresentationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConferencePresentations to delete
     */
    where?: ConferencePresentationWhereInput
    /**
     * Limit how many ConferencePresentations to delete.
     */
    limit?: number
  }

  /**
   * ConferencePresentation without action
   */
  export type ConferencePresentationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferencePresentation
     */
    select?: ConferencePresentationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConferencePresentation
     */
    omit?: ConferencePresentationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferencePresentationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AcademicQualificationScalarFieldEnum: {
    id: 'id',
    degree: 'degree',
    institution: 'institution',
    program: 'program',
    yearCompleted: 'yearCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    diplomaFileUrl: 'diplomaFileUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type AcademicQualificationScalarFieldEnum = (typeof AcademicQualificationScalarFieldEnum)[keyof typeof AcademicQualificationScalarFieldEnum]


  export const ProfessionalLicenseScalarFieldEnum: {
    id: 'id',
    examination: 'examination',
    monthYear: 'monthYear',
    licenseNumber: 'licenseNumber',
    expiration: 'expiration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    licenseFileUrl: 'licenseFileUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type ProfessionalLicenseScalarFieldEnum = (typeof ProfessionalLicenseScalarFieldEnum)[keyof typeof ProfessionalLicenseScalarFieldEnum]


  export const WorkExperienceScalarFieldEnum: {
    id: 'id',
    institution: 'institution',
    position: 'position',
    natureOfWork: 'natureOfWork',
    inclusiveYears: 'inclusiveYears',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    proofUrl: 'proofUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type WorkExperienceScalarFieldEnum = (typeof WorkExperienceScalarFieldEnum)[keyof typeof WorkExperienceScalarFieldEnum]


  export const ProfessionalAffiliationScalarFieldEnum: {
    id: 'id',
    organization: 'organization',
    position: 'position',
    inclusiveYears: 'inclusiveYears',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    membershipProofUrl: 'membershipProofUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type ProfessionalAffiliationScalarFieldEnum = (typeof ProfessionalAffiliationScalarFieldEnum)[keyof typeof ProfessionalAffiliationScalarFieldEnum]


  export const AwardRecognitionScalarFieldEnum: {
    id: 'id',
    awardName: 'awardName',
    awardingBody: 'awardingBody',
    yearReceived: 'yearReceived',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    certificateUrl: 'certificateUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type AwardRecognitionScalarFieldEnum = (typeof AwardRecognitionScalarFieldEnum)[keyof typeof AwardRecognitionScalarFieldEnum]


  export const ProfessionalDevelopmentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    organizer: 'organizer',
    dateLocation: 'dateLocation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    certificateFileUrl: 'certificateFileUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type ProfessionalDevelopmentScalarFieldEnum = (typeof ProfessionalDevelopmentScalarFieldEnum)[keyof typeof ProfessionalDevelopmentScalarFieldEnum]


  export const CommunityInvolvementScalarFieldEnum: {
    id: 'id',
    engagementTitle: 'engagementTitle',
    role: 'role',
    locationDate: 'locationDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    proofUrl: 'proofUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type CommunityInvolvementScalarFieldEnum = (typeof CommunityInvolvementScalarFieldEnum)[keyof typeof CommunityInvolvementScalarFieldEnum]


  export const PublicationScalarFieldEnum: {
    id: 'id',
    researchTitle: 'researchTitle',
    journal: 'journal',
    datePublished: 'datePublished',
    doiLink: 'doiLink',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    pdfUrl: 'pdfUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type PublicationScalarFieldEnum = (typeof PublicationScalarFieldEnum)[keyof typeof PublicationScalarFieldEnum]


  export const ConferencePresentationScalarFieldEnum: {
    id: 'id',
    paperTitle: 'paperTitle',
    eventName: 'eventName',
    dateLocation: 'dateLocation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    proofUrl: 'proofUrl',
    status: 'status',
    rejectionReason: 'rejectionReason'
  };

  export type ConferencePresentationScalarFieldEnum = (typeof ConferencePresentationScalarFieldEnum)[keyof typeof ConferencePresentationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'ApprovalStatus'
   */
  export type EnumApprovalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    academicQualifications?: AcademicQualificationListRelationFilter
    professionalLicenses?: ProfessionalLicenseListRelationFilter
    workExperiences?: WorkExperienceListRelationFilter
    professionalAffiliations?: ProfessionalAffiliationListRelationFilter
    awardsRecognitions?: AwardRecognitionListRelationFilter
    professionalDevelopments?: ProfessionalDevelopmentListRelationFilter
    communityInvolvements?: CommunityInvolvementListRelationFilter
    publications?: PublicationListRelationFilter
    conferencePresentations?: ConferencePresentationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    academicQualifications?: AcademicQualificationOrderByRelationAggregateInput
    professionalLicenses?: ProfessionalLicenseOrderByRelationAggregateInput
    workExperiences?: WorkExperienceOrderByRelationAggregateInput
    professionalAffiliations?: ProfessionalAffiliationOrderByRelationAggregateInput
    awardsRecognitions?: AwardRecognitionOrderByRelationAggregateInput
    professionalDevelopments?: ProfessionalDevelopmentOrderByRelationAggregateInput
    communityInvolvements?: CommunityInvolvementOrderByRelationAggregateInput
    publications?: PublicationOrderByRelationAggregateInput
    conferencePresentations?: ConferencePresentationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    academicQualifications?: AcademicQualificationListRelationFilter
    professionalLicenses?: ProfessionalLicenseListRelationFilter
    workExperiences?: WorkExperienceListRelationFilter
    professionalAffiliations?: ProfessionalAffiliationListRelationFilter
    awardsRecognitions?: AwardRecognitionListRelationFilter
    professionalDevelopments?: ProfessionalDevelopmentListRelationFilter
    communityInvolvements?: CommunityInvolvementListRelationFilter
    publications?: PublicationListRelationFilter
    conferencePresentations?: ConferencePresentationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AcademicQualificationWhereInput = {
    AND?: AcademicQualificationWhereInput | AcademicQualificationWhereInput[]
    OR?: AcademicQualificationWhereInput[]
    NOT?: AcademicQualificationWhereInput | AcademicQualificationWhereInput[]
    id?: StringFilter<"AcademicQualification"> | string
    degree?: StringFilter<"AcademicQualification"> | string
    institution?: StringFilter<"AcademicQualification"> | string
    program?: StringFilter<"AcademicQualification"> | string
    yearCompleted?: IntFilter<"AcademicQualification"> | number
    createdAt?: DateTimeFilter<"AcademicQualification"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicQualification"> | Date | string
    userId?: StringFilter<"AcademicQualification"> | string
    diplomaFileUrl?: StringNullableFilter<"AcademicQualification"> | string | null
    status?: EnumApprovalStatusFilter<"AcademicQualification"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"AcademicQualification"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AcademicQualificationOrderByWithRelationInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    program?: SortOrder
    yearCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    diplomaFileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AcademicQualificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AcademicQualificationWhereInput | AcademicQualificationWhereInput[]
    OR?: AcademicQualificationWhereInput[]
    NOT?: AcademicQualificationWhereInput | AcademicQualificationWhereInput[]
    degree?: StringFilter<"AcademicQualification"> | string
    institution?: StringFilter<"AcademicQualification"> | string
    program?: StringFilter<"AcademicQualification"> | string
    yearCompleted?: IntFilter<"AcademicQualification"> | number
    createdAt?: DateTimeFilter<"AcademicQualification"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicQualification"> | Date | string
    userId?: StringFilter<"AcademicQualification"> | string
    diplomaFileUrl?: StringNullableFilter<"AcademicQualification"> | string | null
    status?: EnumApprovalStatusFilter<"AcademicQualification"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"AcademicQualification"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AcademicQualificationOrderByWithAggregationInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    program?: SortOrder
    yearCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    diplomaFileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: AcademicQualificationCountOrderByAggregateInput
    _avg?: AcademicQualificationAvgOrderByAggregateInput
    _max?: AcademicQualificationMaxOrderByAggregateInput
    _min?: AcademicQualificationMinOrderByAggregateInput
    _sum?: AcademicQualificationSumOrderByAggregateInput
  }

  export type AcademicQualificationScalarWhereWithAggregatesInput = {
    AND?: AcademicQualificationScalarWhereWithAggregatesInput | AcademicQualificationScalarWhereWithAggregatesInput[]
    OR?: AcademicQualificationScalarWhereWithAggregatesInput[]
    NOT?: AcademicQualificationScalarWhereWithAggregatesInput | AcademicQualificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcademicQualification"> | string
    degree?: StringWithAggregatesFilter<"AcademicQualification"> | string
    institution?: StringWithAggregatesFilter<"AcademicQualification"> | string
    program?: StringWithAggregatesFilter<"AcademicQualification"> | string
    yearCompleted?: IntWithAggregatesFilter<"AcademicQualification"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AcademicQualification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcademicQualification"> | Date | string
    userId?: StringWithAggregatesFilter<"AcademicQualification"> | string
    diplomaFileUrl?: StringNullableWithAggregatesFilter<"AcademicQualification"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"AcademicQualification"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"AcademicQualification"> | string | null
  }

  export type ProfessionalLicenseWhereInput = {
    AND?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    OR?: ProfessionalLicenseWhereInput[]
    NOT?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    id?: StringFilter<"ProfessionalLicense"> | string
    examination?: StringFilter<"ProfessionalLicense"> | string
    monthYear?: StringFilter<"ProfessionalLicense"> | string
    licenseNumber?: StringFilter<"ProfessionalLicense"> | string
    expiration?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    createdAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    userId?: StringFilter<"ProfessionalLicense"> | string
    licenseFileUrl?: StringNullableFilter<"ProfessionalLicense"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalLicense"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalLicense"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfessionalLicenseOrderByWithRelationInput = {
    id?: SortOrder
    examination?: SortOrder
    monthYear?: SortOrder
    licenseNumber?: SortOrder
    expiration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    licenseFileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfessionalLicenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    licenseNumber?: string
    AND?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    OR?: ProfessionalLicenseWhereInput[]
    NOT?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    examination?: StringFilter<"ProfessionalLicense"> | string
    monthYear?: StringFilter<"ProfessionalLicense"> | string
    expiration?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    createdAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    userId?: StringFilter<"ProfessionalLicense"> | string
    licenseFileUrl?: StringNullableFilter<"ProfessionalLicense"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalLicense"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalLicense"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "licenseNumber">

  export type ProfessionalLicenseOrderByWithAggregationInput = {
    id?: SortOrder
    examination?: SortOrder
    monthYear?: SortOrder
    licenseNumber?: SortOrder
    expiration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    licenseFileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: ProfessionalLicenseCountOrderByAggregateInput
    _max?: ProfessionalLicenseMaxOrderByAggregateInput
    _min?: ProfessionalLicenseMinOrderByAggregateInput
  }

  export type ProfessionalLicenseScalarWhereWithAggregatesInput = {
    AND?: ProfessionalLicenseScalarWhereWithAggregatesInput | ProfessionalLicenseScalarWhereWithAggregatesInput[]
    OR?: ProfessionalLicenseScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalLicenseScalarWhereWithAggregatesInput | ProfessionalLicenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    examination?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    monthYear?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    licenseNumber?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    expiration?: DateTimeWithAggregatesFilter<"ProfessionalLicense"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalLicense"> | Date | string
    userId?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    licenseFileUrl?: StringNullableWithAggregatesFilter<"ProfessionalLicense"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"ProfessionalLicense"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"ProfessionalLicense"> | string | null
  }

  export type WorkExperienceWhereInput = {
    AND?: WorkExperienceWhereInput | WorkExperienceWhereInput[]
    OR?: WorkExperienceWhereInput[]
    NOT?: WorkExperienceWhereInput | WorkExperienceWhereInput[]
    id?: StringFilter<"WorkExperience"> | string
    institution?: StringFilter<"WorkExperience"> | string
    position?: StringFilter<"WorkExperience"> | string
    natureOfWork?: StringNullableFilter<"WorkExperience"> | string | null
    inclusiveYears?: StringFilter<"WorkExperience"> | string
    createdAt?: DateTimeFilter<"WorkExperience"> | Date | string
    updatedAt?: DateTimeFilter<"WorkExperience"> | Date | string
    userId?: StringFilter<"WorkExperience"> | string
    proofUrl?: StringNullableFilter<"WorkExperience"> | string | null
    status?: EnumApprovalStatusFilter<"WorkExperience"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"WorkExperience"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WorkExperienceOrderByWithRelationInput = {
    id?: SortOrder
    institution?: SortOrder
    position?: SortOrder
    natureOfWork?: SortOrderInput | SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WorkExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkExperienceWhereInput | WorkExperienceWhereInput[]
    OR?: WorkExperienceWhereInput[]
    NOT?: WorkExperienceWhereInput | WorkExperienceWhereInput[]
    institution?: StringFilter<"WorkExperience"> | string
    position?: StringFilter<"WorkExperience"> | string
    natureOfWork?: StringNullableFilter<"WorkExperience"> | string | null
    inclusiveYears?: StringFilter<"WorkExperience"> | string
    createdAt?: DateTimeFilter<"WorkExperience"> | Date | string
    updatedAt?: DateTimeFilter<"WorkExperience"> | Date | string
    userId?: StringFilter<"WorkExperience"> | string
    proofUrl?: StringNullableFilter<"WorkExperience"> | string | null
    status?: EnumApprovalStatusFilter<"WorkExperience"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"WorkExperience"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WorkExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    institution?: SortOrder
    position?: SortOrder
    natureOfWork?: SortOrderInput | SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: WorkExperienceCountOrderByAggregateInput
    _max?: WorkExperienceMaxOrderByAggregateInput
    _min?: WorkExperienceMinOrderByAggregateInput
  }

  export type WorkExperienceScalarWhereWithAggregatesInput = {
    AND?: WorkExperienceScalarWhereWithAggregatesInput | WorkExperienceScalarWhereWithAggregatesInput[]
    OR?: WorkExperienceScalarWhereWithAggregatesInput[]
    NOT?: WorkExperienceScalarWhereWithAggregatesInput | WorkExperienceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkExperience"> | string
    institution?: StringWithAggregatesFilter<"WorkExperience"> | string
    position?: StringWithAggregatesFilter<"WorkExperience"> | string
    natureOfWork?: StringNullableWithAggregatesFilter<"WorkExperience"> | string | null
    inclusiveYears?: StringWithAggregatesFilter<"WorkExperience"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkExperience"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkExperience"> | Date | string
    userId?: StringWithAggregatesFilter<"WorkExperience"> | string
    proofUrl?: StringNullableWithAggregatesFilter<"WorkExperience"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"WorkExperience"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"WorkExperience"> | string | null
  }

  export type ProfessionalAffiliationWhereInput = {
    AND?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    OR?: ProfessionalAffiliationWhereInput[]
    NOT?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    id?: StringFilter<"ProfessionalAffiliation"> | string
    organization?: StringFilter<"ProfessionalAffiliation"> | string
    position?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    inclusiveYears?: StringFilter<"ProfessionalAffiliation"> | string
    createdAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    userId?: StringFilter<"ProfessionalAffiliation"> | string
    membershipProofUrl?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalAffiliation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfessionalAffiliationOrderByWithRelationInput = {
    id?: SortOrder
    organization?: SortOrder
    position?: SortOrderInput | SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    membershipProofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfessionalAffiliationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    OR?: ProfessionalAffiliationWhereInput[]
    NOT?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    organization?: StringFilter<"ProfessionalAffiliation"> | string
    position?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    inclusiveYears?: StringFilter<"ProfessionalAffiliation"> | string
    createdAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    userId?: StringFilter<"ProfessionalAffiliation"> | string
    membershipProofUrl?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalAffiliation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProfessionalAffiliationOrderByWithAggregationInput = {
    id?: SortOrder
    organization?: SortOrder
    position?: SortOrderInput | SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    membershipProofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: ProfessionalAffiliationCountOrderByAggregateInput
    _max?: ProfessionalAffiliationMaxOrderByAggregateInput
    _min?: ProfessionalAffiliationMinOrderByAggregateInput
  }

  export type ProfessionalAffiliationScalarWhereWithAggregatesInput = {
    AND?: ProfessionalAffiliationScalarWhereWithAggregatesInput | ProfessionalAffiliationScalarWhereWithAggregatesInput[]
    OR?: ProfessionalAffiliationScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalAffiliationScalarWhereWithAggregatesInput | ProfessionalAffiliationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    organization?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    position?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
    inclusiveYears?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalAffiliation"> | Date | string
    userId?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    membershipProofUrl?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"ProfessionalAffiliation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
  }

  export type AwardRecognitionWhereInput = {
    AND?: AwardRecognitionWhereInput | AwardRecognitionWhereInput[]
    OR?: AwardRecognitionWhereInput[]
    NOT?: AwardRecognitionWhereInput | AwardRecognitionWhereInput[]
    id?: StringFilter<"AwardRecognition"> | string
    awardName?: StringFilter<"AwardRecognition"> | string
    awardingBody?: StringFilter<"AwardRecognition"> | string
    yearReceived?: IntFilter<"AwardRecognition"> | number
    createdAt?: DateTimeFilter<"AwardRecognition"> | Date | string
    updatedAt?: DateTimeFilter<"AwardRecognition"> | Date | string
    userId?: StringFilter<"AwardRecognition"> | string
    certificateUrl?: StringNullableFilter<"AwardRecognition"> | string | null
    status?: EnumApprovalStatusFilter<"AwardRecognition"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"AwardRecognition"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AwardRecognitionOrderByWithRelationInput = {
    id?: SortOrder
    awardName?: SortOrder
    awardingBody?: SortOrder
    yearReceived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AwardRecognitionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AwardRecognitionWhereInput | AwardRecognitionWhereInput[]
    OR?: AwardRecognitionWhereInput[]
    NOT?: AwardRecognitionWhereInput | AwardRecognitionWhereInput[]
    awardName?: StringFilter<"AwardRecognition"> | string
    awardingBody?: StringFilter<"AwardRecognition"> | string
    yearReceived?: IntFilter<"AwardRecognition"> | number
    createdAt?: DateTimeFilter<"AwardRecognition"> | Date | string
    updatedAt?: DateTimeFilter<"AwardRecognition"> | Date | string
    userId?: StringFilter<"AwardRecognition"> | string
    certificateUrl?: StringNullableFilter<"AwardRecognition"> | string | null
    status?: EnumApprovalStatusFilter<"AwardRecognition"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"AwardRecognition"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AwardRecognitionOrderByWithAggregationInput = {
    id?: SortOrder
    awardName?: SortOrder
    awardingBody?: SortOrder
    yearReceived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: AwardRecognitionCountOrderByAggregateInput
    _avg?: AwardRecognitionAvgOrderByAggregateInput
    _max?: AwardRecognitionMaxOrderByAggregateInput
    _min?: AwardRecognitionMinOrderByAggregateInput
    _sum?: AwardRecognitionSumOrderByAggregateInput
  }

  export type AwardRecognitionScalarWhereWithAggregatesInput = {
    AND?: AwardRecognitionScalarWhereWithAggregatesInput | AwardRecognitionScalarWhereWithAggregatesInput[]
    OR?: AwardRecognitionScalarWhereWithAggregatesInput[]
    NOT?: AwardRecognitionScalarWhereWithAggregatesInput | AwardRecognitionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AwardRecognition"> | string
    awardName?: StringWithAggregatesFilter<"AwardRecognition"> | string
    awardingBody?: StringWithAggregatesFilter<"AwardRecognition"> | string
    yearReceived?: IntWithAggregatesFilter<"AwardRecognition"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AwardRecognition"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AwardRecognition"> | Date | string
    userId?: StringWithAggregatesFilter<"AwardRecognition"> | string
    certificateUrl?: StringNullableWithAggregatesFilter<"AwardRecognition"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"AwardRecognition"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"AwardRecognition"> | string | null
  }

  export type ProfessionalDevelopmentWhereInput = {
    AND?: ProfessionalDevelopmentWhereInput | ProfessionalDevelopmentWhereInput[]
    OR?: ProfessionalDevelopmentWhereInput[]
    NOT?: ProfessionalDevelopmentWhereInput | ProfessionalDevelopmentWhereInput[]
    id?: StringFilter<"ProfessionalDevelopment"> | string
    title?: StringFilter<"ProfessionalDevelopment"> | string
    organizer?: StringFilter<"ProfessionalDevelopment"> | string
    dateLocation?: StringFilter<"ProfessionalDevelopment"> | string
    createdAt?: DateTimeFilter<"ProfessionalDevelopment"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalDevelopment"> | Date | string
    userId?: StringFilter<"ProfessionalDevelopment"> | string
    certificateFileUrl?: StringNullableFilter<"ProfessionalDevelopment"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalDevelopment"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalDevelopment"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfessionalDevelopmentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    organizer?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateFileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfessionalDevelopmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalDevelopmentWhereInput | ProfessionalDevelopmentWhereInput[]
    OR?: ProfessionalDevelopmentWhereInput[]
    NOT?: ProfessionalDevelopmentWhereInput | ProfessionalDevelopmentWhereInput[]
    title?: StringFilter<"ProfessionalDevelopment"> | string
    organizer?: StringFilter<"ProfessionalDevelopment"> | string
    dateLocation?: StringFilter<"ProfessionalDevelopment"> | string
    createdAt?: DateTimeFilter<"ProfessionalDevelopment"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalDevelopment"> | Date | string
    userId?: StringFilter<"ProfessionalDevelopment"> | string
    certificateFileUrl?: StringNullableFilter<"ProfessionalDevelopment"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalDevelopment"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalDevelopment"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProfessionalDevelopmentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    organizer?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateFileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: ProfessionalDevelopmentCountOrderByAggregateInput
    _max?: ProfessionalDevelopmentMaxOrderByAggregateInput
    _min?: ProfessionalDevelopmentMinOrderByAggregateInput
  }

  export type ProfessionalDevelopmentScalarWhereWithAggregatesInput = {
    AND?: ProfessionalDevelopmentScalarWhereWithAggregatesInput | ProfessionalDevelopmentScalarWhereWithAggregatesInput[]
    OR?: ProfessionalDevelopmentScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalDevelopmentScalarWhereWithAggregatesInput | ProfessionalDevelopmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalDevelopment"> | string
    title?: StringWithAggregatesFilter<"ProfessionalDevelopment"> | string
    organizer?: StringWithAggregatesFilter<"ProfessionalDevelopment"> | string
    dateLocation?: StringWithAggregatesFilter<"ProfessionalDevelopment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalDevelopment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalDevelopment"> | Date | string
    userId?: StringWithAggregatesFilter<"ProfessionalDevelopment"> | string
    certificateFileUrl?: StringNullableWithAggregatesFilter<"ProfessionalDevelopment"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"ProfessionalDevelopment"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"ProfessionalDevelopment"> | string | null
  }

  export type CommunityInvolvementWhereInput = {
    AND?: CommunityInvolvementWhereInput | CommunityInvolvementWhereInput[]
    OR?: CommunityInvolvementWhereInput[]
    NOT?: CommunityInvolvementWhereInput | CommunityInvolvementWhereInput[]
    id?: StringFilter<"CommunityInvolvement"> | string
    engagementTitle?: StringFilter<"CommunityInvolvement"> | string
    role?: StringFilter<"CommunityInvolvement"> | string
    locationDate?: StringFilter<"CommunityInvolvement"> | string
    createdAt?: DateTimeFilter<"CommunityInvolvement"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityInvolvement"> | Date | string
    userId?: StringFilter<"CommunityInvolvement"> | string
    proofUrl?: StringNullableFilter<"CommunityInvolvement"> | string | null
    status?: EnumApprovalStatusFilter<"CommunityInvolvement"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"CommunityInvolvement"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommunityInvolvementOrderByWithRelationInput = {
    id?: SortOrder
    engagementTitle?: SortOrder
    role?: SortOrder
    locationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CommunityInvolvementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommunityInvolvementWhereInput | CommunityInvolvementWhereInput[]
    OR?: CommunityInvolvementWhereInput[]
    NOT?: CommunityInvolvementWhereInput | CommunityInvolvementWhereInput[]
    engagementTitle?: StringFilter<"CommunityInvolvement"> | string
    role?: StringFilter<"CommunityInvolvement"> | string
    locationDate?: StringFilter<"CommunityInvolvement"> | string
    createdAt?: DateTimeFilter<"CommunityInvolvement"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityInvolvement"> | Date | string
    userId?: StringFilter<"CommunityInvolvement"> | string
    proofUrl?: StringNullableFilter<"CommunityInvolvement"> | string | null
    status?: EnumApprovalStatusFilter<"CommunityInvolvement"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"CommunityInvolvement"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CommunityInvolvementOrderByWithAggregationInput = {
    id?: SortOrder
    engagementTitle?: SortOrder
    role?: SortOrder
    locationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: CommunityInvolvementCountOrderByAggregateInput
    _max?: CommunityInvolvementMaxOrderByAggregateInput
    _min?: CommunityInvolvementMinOrderByAggregateInput
  }

  export type CommunityInvolvementScalarWhereWithAggregatesInput = {
    AND?: CommunityInvolvementScalarWhereWithAggregatesInput | CommunityInvolvementScalarWhereWithAggregatesInput[]
    OR?: CommunityInvolvementScalarWhereWithAggregatesInput[]
    NOT?: CommunityInvolvementScalarWhereWithAggregatesInput | CommunityInvolvementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommunityInvolvement"> | string
    engagementTitle?: StringWithAggregatesFilter<"CommunityInvolvement"> | string
    role?: StringWithAggregatesFilter<"CommunityInvolvement"> | string
    locationDate?: StringWithAggregatesFilter<"CommunityInvolvement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CommunityInvolvement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CommunityInvolvement"> | Date | string
    userId?: StringWithAggregatesFilter<"CommunityInvolvement"> | string
    proofUrl?: StringNullableWithAggregatesFilter<"CommunityInvolvement"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"CommunityInvolvement"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"CommunityInvolvement"> | string | null
  }

  export type PublicationWhereInput = {
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    id?: StringFilter<"Publication"> | string
    researchTitle?: StringFilter<"Publication"> | string
    journal?: StringFilter<"Publication"> | string
    datePublished?: DateTimeFilter<"Publication"> | Date | string
    doiLink?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
    userId?: StringFilter<"Publication"> | string
    pdfUrl?: StringNullableFilter<"Publication"> | string | null
    status?: EnumApprovalStatusFilter<"Publication"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"Publication"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PublicationOrderByWithRelationInput = {
    id?: SortOrder
    researchTitle?: SortOrder
    journal?: SortOrder
    datePublished?: SortOrder
    doiLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PublicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    researchTitle?: StringFilter<"Publication"> | string
    journal?: StringFilter<"Publication"> | string
    datePublished?: DateTimeFilter<"Publication"> | Date | string
    doiLink?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
    userId?: StringFilter<"Publication"> | string
    pdfUrl?: StringNullableFilter<"Publication"> | string | null
    status?: EnumApprovalStatusFilter<"Publication"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"Publication"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PublicationOrderByWithAggregationInput = {
    id?: SortOrder
    researchTitle?: SortOrder
    journal?: SortOrder
    datePublished?: SortOrder
    doiLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: PublicationCountOrderByAggregateInput
    _max?: PublicationMaxOrderByAggregateInput
    _min?: PublicationMinOrderByAggregateInput
  }

  export type PublicationScalarWhereWithAggregatesInput = {
    AND?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    OR?: PublicationScalarWhereWithAggregatesInput[]
    NOT?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Publication"> | string
    researchTitle?: StringWithAggregatesFilter<"Publication"> | string
    journal?: StringWithAggregatesFilter<"Publication"> | string
    datePublished?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
    doiLink?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
    userId?: StringWithAggregatesFilter<"Publication"> | string
    pdfUrl?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"Publication"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"Publication"> | string | null
  }

  export type ConferencePresentationWhereInput = {
    AND?: ConferencePresentationWhereInput | ConferencePresentationWhereInput[]
    OR?: ConferencePresentationWhereInput[]
    NOT?: ConferencePresentationWhereInput | ConferencePresentationWhereInput[]
    id?: StringFilter<"ConferencePresentation"> | string
    paperTitle?: StringFilter<"ConferencePresentation"> | string
    eventName?: StringFilter<"ConferencePresentation"> | string
    dateLocation?: StringFilter<"ConferencePresentation"> | string
    createdAt?: DateTimeFilter<"ConferencePresentation"> | Date | string
    updatedAt?: DateTimeFilter<"ConferencePresentation"> | Date | string
    userId?: StringFilter<"ConferencePresentation"> | string
    proofUrl?: StringNullableFilter<"ConferencePresentation"> | string | null
    status?: EnumApprovalStatusFilter<"ConferencePresentation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ConferencePresentation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ConferencePresentationOrderByWithRelationInput = {
    id?: SortOrder
    paperTitle?: SortOrder
    eventName?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ConferencePresentationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConferencePresentationWhereInput | ConferencePresentationWhereInput[]
    OR?: ConferencePresentationWhereInput[]
    NOT?: ConferencePresentationWhereInput | ConferencePresentationWhereInput[]
    paperTitle?: StringFilter<"ConferencePresentation"> | string
    eventName?: StringFilter<"ConferencePresentation"> | string
    dateLocation?: StringFilter<"ConferencePresentation"> | string
    createdAt?: DateTimeFilter<"ConferencePresentation"> | Date | string
    updatedAt?: DateTimeFilter<"ConferencePresentation"> | Date | string
    userId?: StringFilter<"ConferencePresentation"> | string
    proofUrl?: StringNullableFilter<"ConferencePresentation"> | string | null
    status?: EnumApprovalStatusFilter<"ConferencePresentation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ConferencePresentation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ConferencePresentationOrderByWithAggregationInput = {
    id?: SortOrder
    paperTitle?: SortOrder
    eventName?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    _count?: ConferencePresentationCountOrderByAggregateInput
    _max?: ConferencePresentationMaxOrderByAggregateInput
    _min?: ConferencePresentationMinOrderByAggregateInput
  }

  export type ConferencePresentationScalarWhereWithAggregatesInput = {
    AND?: ConferencePresentationScalarWhereWithAggregatesInput | ConferencePresentationScalarWhereWithAggregatesInput[]
    OR?: ConferencePresentationScalarWhereWithAggregatesInput[]
    NOT?: ConferencePresentationScalarWhereWithAggregatesInput | ConferencePresentationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConferencePresentation"> | string
    paperTitle?: StringWithAggregatesFilter<"ConferencePresentation"> | string
    eventName?: StringWithAggregatesFilter<"ConferencePresentation"> | string
    dateLocation?: StringWithAggregatesFilter<"ConferencePresentation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ConferencePresentation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ConferencePresentation"> | Date | string
    userId?: StringWithAggregatesFilter<"ConferencePresentation"> | string
    proofUrl?: StringNullableWithAggregatesFilter<"ConferencePresentation"> | string | null
    status?: EnumApprovalStatusWithAggregatesFilter<"ConferencePresentation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"ConferencePresentation"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicQualificationCreateInput = {
    id?: string
    degree: string
    institution: string
    program: string
    yearCompleted: number
    createdAt?: Date | string
    updatedAt?: Date | string
    diplomaFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutAcademicQualificationsInput
  }

  export type AcademicQualificationUncheckedCreateInput = {
    id?: string
    degree: string
    institution: string
    program: string
    yearCompleted: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    diplomaFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AcademicQualificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    yearCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diplomaFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAcademicQualificationsNestedInput
  }

  export type AcademicQualificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    yearCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    diplomaFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademicQualificationCreateManyInput = {
    id?: string
    degree: string
    institution: string
    program: string
    yearCompleted: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    diplomaFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AcademicQualificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    yearCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diplomaFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademicQualificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    yearCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    diplomaFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalLicenseCreateInput = {
    id?: string
    examination: string
    monthYear: string
    licenseNumber: string
    expiration: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    licenseFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutProfessionalLicensesInput
  }

  export type ProfessionalLicenseUncheckedCreateInput = {
    id?: string
    examination: string
    monthYear: string
    licenseNumber: string
    expiration: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    licenseFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalLicenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examination?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenseFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutProfessionalLicensesNestedInput
  }

  export type ProfessionalLicenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examination?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    licenseFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalLicenseCreateManyInput = {
    id?: string
    examination: string
    monthYear: string
    licenseNumber: string
    expiration: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    licenseFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalLicenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    examination?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenseFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalLicenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    examination?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    licenseFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkExperienceCreateInput = {
    id?: string
    institution: string
    position: string
    natureOfWork?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutWorkExperiencesInput
  }

  export type WorkExperienceUncheckedCreateInput = {
    id?: string
    institution: string
    position: string
    natureOfWork?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type WorkExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    natureOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutWorkExperiencesNestedInput
  }

  export type WorkExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    natureOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkExperienceCreateManyInput = {
    id?: string
    institution: string
    position: string
    natureOfWork?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type WorkExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    natureOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    natureOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalAffiliationCreateInput = {
    id?: string
    organization: string
    position?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    membershipProofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutProfessionalAffiliationsInput
  }

  export type ProfessionalAffiliationUncheckedCreateInput = {
    id?: string
    organization: string
    position?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    membershipProofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalAffiliationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membershipProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutProfessionalAffiliationsNestedInput
  }

  export type ProfessionalAffiliationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    membershipProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalAffiliationCreateManyInput = {
    id?: string
    organization: string
    position?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    membershipProofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalAffiliationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membershipProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalAffiliationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    membershipProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AwardRecognitionCreateInput = {
    id?: string
    awardName: string
    awardingBody: string
    yearReceived: number
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutAwardsRecognitionsInput
  }

  export type AwardRecognitionUncheckedCreateInput = {
    id?: string
    awardName: string
    awardingBody: string
    yearReceived: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    certificateUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AwardRecognitionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    awardName?: StringFieldUpdateOperationsInput | string
    awardingBody?: StringFieldUpdateOperationsInput | string
    yearReceived?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAwardsRecognitionsNestedInput
  }

  export type AwardRecognitionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    awardName?: StringFieldUpdateOperationsInput | string
    awardingBody?: StringFieldUpdateOperationsInput | string
    yearReceived?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    certificateUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AwardRecognitionCreateManyInput = {
    id?: string
    awardName: string
    awardingBody: string
    yearReceived: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    certificateUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AwardRecognitionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    awardName?: StringFieldUpdateOperationsInput | string
    awardingBody?: StringFieldUpdateOperationsInput | string
    yearReceived?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AwardRecognitionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    awardName?: StringFieldUpdateOperationsInput | string
    awardingBody?: StringFieldUpdateOperationsInput | string
    yearReceived?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    certificateUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalDevelopmentCreateInput = {
    id?: string
    title: string
    organizer: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutProfessionalDevelopmentsInput
  }

  export type ProfessionalDevelopmentUncheckedCreateInput = {
    id?: string
    title: string
    organizer: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    certificateFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalDevelopmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutProfessionalDevelopmentsNestedInput
  }

  export type ProfessionalDevelopmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    certificateFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalDevelopmentCreateManyInput = {
    id?: string
    title: string
    organizer: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    certificateFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalDevelopmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalDevelopmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    certificateFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityInvolvementCreateInput = {
    id?: string
    engagementTitle: string
    role: string
    locationDate: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutCommunityInvolvementsInput
  }

  export type CommunityInvolvementUncheckedCreateInput = {
    id?: string
    engagementTitle: string
    role: string
    locationDate: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type CommunityInvolvementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementTitle?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    locationDate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutCommunityInvolvementsNestedInput
  }

  export type CommunityInvolvementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementTitle?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    locationDate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityInvolvementCreateManyInput = {
    id?: string
    engagementTitle: string
    role: string
    locationDate: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type CommunityInvolvementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementTitle?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    locationDate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityInvolvementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementTitle?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    locationDate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicationCreateInput = {
    id?: string
    researchTitle: string
    journal: string
    datePublished: Date | string
    doiLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pdfUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutPublicationsInput
  }

  export type PublicationUncheckedCreateInput = {
    id?: string
    researchTitle: string
    journal: string
    datePublished: Date | string
    doiLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    pdfUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type PublicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    researchTitle?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    datePublished?: DateTimeFieldUpdateOperationsInput | Date | string
    doiLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutPublicationsNestedInput
  }

  export type PublicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    researchTitle?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    datePublished?: DateTimeFieldUpdateOperationsInput | Date | string
    doiLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicationCreateManyInput = {
    id?: string
    researchTitle: string
    journal: string
    datePublished: Date | string
    doiLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    pdfUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type PublicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    researchTitle?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    datePublished?: DateTimeFieldUpdateOperationsInput | Date | string
    doiLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    researchTitle?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    datePublished?: DateTimeFieldUpdateOperationsInput | Date | string
    doiLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConferencePresentationCreateInput = {
    id?: string
    paperTitle: string
    eventName: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
    user: UserCreateNestedOneWithoutConferencePresentationsInput
  }

  export type ConferencePresentationUncheckedCreateInput = {
    id?: string
    paperTitle: string
    eventName: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ConferencePresentationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperTitle?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutConferencePresentationsNestedInput
  }

  export type ConferencePresentationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperTitle?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConferencePresentationCreateManyInput = {
    id?: string
    paperTitle: string
    eventName: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ConferencePresentationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperTitle?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConferencePresentationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperTitle?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AcademicQualificationListRelationFilter = {
    every?: AcademicQualificationWhereInput
    some?: AcademicQualificationWhereInput
    none?: AcademicQualificationWhereInput
  }

  export type ProfessionalLicenseListRelationFilter = {
    every?: ProfessionalLicenseWhereInput
    some?: ProfessionalLicenseWhereInput
    none?: ProfessionalLicenseWhereInput
  }

  export type WorkExperienceListRelationFilter = {
    every?: WorkExperienceWhereInput
    some?: WorkExperienceWhereInput
    none?: WorkExperienceWhereInput
  }

  export type ProfessionalAffiliationListRelationFilter = {
    every?: ProfessionalAffiliationWhereInput
    some?: ProfessionalAffiliationWhereInput
    none?: ProfessionalAffiliationWhereInput
  }

  export type AwardRecognitionListRelationFilter = {
    every?: AwardRecognitionWhereInput
    some?: AwardRecognitionWhereInput
    none?: AwardRecognitionWhereInput
  }

  export type ProfessionalDevelopmentListRelationFilter = {
    every?: ProfessionalDevelopmentWhereInput
    some?: ProfessionalDevelopmentWhereInput
    none?: ProfessionalDevelopmentWhereInput
  }

  export type CommunityInvolvementListRelationFilter = {
    every?: CommunityInvolvementWhereInput
    some?: CommunityInvolvementWhereInput
    none?: CommunityInvolvementWhereInput
  }

  export type PublicationListRelationFilter = {
    every?: PublicationWhereInput
    some?: PublicationWhereInput
    none?: PublicationWhereInput
  }

  export type ConferencePresentationListRelationFilter = {
    every?: ConferencePresentationWhereInput
    some?: ConferencePresentationWhereInput
    none?: ConferencePresentationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AcademicQualificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalLicenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalAffiliationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AwardRecognitionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalDevelopmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommunityInvolvementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PublicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConferencePresentationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalStatus | EnumApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalStatus[]
    notIn?: $Enums.ApprovalStatus[]
    not?: NestedEnumApprovalStatusFilter<$PrismaModel> | $Enums.ApprovalStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AcademicQualificationCountOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    program?: SortOrder
    yearCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    diplomaFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AcademicQualificationAvgOrderByAggregateInput = {
    yearCompleted?: SortOrder
  }

  export type AcademicQualificationMaxOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    program?: SortOrder
    yearCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    diplomaFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AcademicQualificationMinOrderByAggregateInput = {
    id?: SortOrder
    degree?: SortOrder
    institution?: SortOrder
    program?: SortOrder
    yearCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    diplomaFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AcademicQualificationSumOrderByAggregateInput = {
    yearCompleted?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumApprovalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalStatus | EnumApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalStatus[]
    notIn?: $Enums.ApprovalStatus[]
    not?: NestedEnumApprovalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApprovalStatusFilter<$PrismaModel>
    _max?: NestedEnumApprovalStatusFilter<$PrismaModel>
  }

  export type ProfessionalLicenseCountOrderByAggregateInput = {
    id?: SortOrder
    examination?: SortOrder
    monthYear?: SortOrder
    licenseNumber?: SortOrder
    expiration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    licenseFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ProfessionalLicenseMaxOrderByAggregateInput = {
    id?: SortOrder
    examination?: SortOrder
    monthYear?: SortOrder
    licenseNumber?: SortOrder
    expiration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    licenseFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ProfessionalLicenseMinOrderByAggregateInput = {
    id?: SortOrder
    examination?: SortOrder
    monthYear?: SortOrder
    licenseNumber?: SortOrder
    expiration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    licenseFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type WorkExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    institution?: SortOrder
    position?: SortOrder
    natureOfWork?: SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type WorkExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    institution?: SortOrder
    position?: SortOrder
    natureOfWork?: SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type WorkExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    institution?: SortOrder
    position?: SortOrder
    natureOfWork?: SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ProfessionalAffiliationCountOrderByAggregateInput = {
    id?: SortOrder
    organization?: SortOrder
    position?: SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    membershipProofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ProfessionalAffiliationMaxOrderByAggregateInput = {
    id?: SortOrder
    organization?: SortOrder
    position?: SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    membershipProofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ProfessionalAffiliationMinOrderByAggregateInput = {
    id?: SortOrder
    organization?: SortOrder
    position?: SortOrder
    inclusiveYears?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    membershipProofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AwardRecognitionCountOrderByAggregateInput = {
    id?: SortOrder
    awardName?: SortOrder
    awardingBody?: SortOrder
    yearReceived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AwardRecognitionAvgOrderByAggregateInput = {
    yearReceived?: SortOrder
  }

  export type AwardRecognitionMaxOrderByAggregateInput = {
    id?: SortOrder
    awardName?: SortOrder
    awardingBody?: SortOrder
    yearReceived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AwardRecognitionMinOrderByAggregateInput = {
    id?: SortOrder
    awardName?: SortOrder
    awardingBody?: SortOrder
    yearReceived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AwardRecognitionSumOrderByAggregateInput = {
    yearReceived?: SortOrder
  }

  export type ProfessionalDevelopmentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    organizer?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ProfessionalDevelopmentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    organizer?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ProfessionalDevelopmentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    organizer?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    certificateFileUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type CommunityInvolvementCountOrderByAggregateInput = {
    id?: SortOrder
    engagementTitle?: SortOrder
    role?: SortOrder
    locationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type CommunityInvolvementMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementTitle?: SortOrder
    role?: SortOrder
    locationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type CommunityInvolvementMinOrderByAggregateInput = {
    id?: SortOrder
    engagementTitle?: SortOrder
    role?: SortOrder
    locationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type PublicationCountOrderByAggregateInput = {
    id?: SortOrder
    researchTitle?: SortOrder
    journal?: SortOrder
    datePublished?: SortOrder
    doiLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    pdfUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type PublicationMaxOrderByAggregateInput = {
    id?: SortOrder
    researchTitle?: SortOrder
    journal?: SortOrder
    datePublished?: SortOrder
    doiLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    pdfUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type PublicationMinOrderByAggregateInput = {
    id?: SortOrder
    researchTitle?: SortOrder
    journal?: SortOrder
    datePublished?: SortOrder
    doiLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    pdfUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ConferencePresentationCountOrderByAggregateInput = {
    id?: SortOrder
    paperTitle?: SortOrder
    eventName?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ConferencePresentationMaxOrderByAggregateInput = {
    id?: SortOrder
    paperTitle?: SortOrder
    eventName?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type ConferencePresentationMinOrderByAggregateInput = {
    id?: SortOrder
    paperTitle?: SortOrder
    eventName?: SortOrder
    dateLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    proofUrl?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
  }

  export type AcademicQualificationCreateNestedManyWithoutUserInput = {
    create?: XOR<AcademicQualificationCreateWithoutUserInput, AcademicQualificationUncheckedCreateWithoutUserInput> | AcademicQualificationCreateWithoutUserInput[] | AcademicQualificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AcademicQualificationCreateOrConnectWithoutUserInput | AcademicQualificationCreateOrConnectWithoutUserInput[]
    createMany?: AcademicQualificationCreateManyUserInputEnvelope
    connect?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
  }

  export type ProfessionalLicenseCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutUserInput, ProfessionalLicenseUncheckedCreateWithoutUserInput> | ProfessionalLicenseCreateWithoutUserInput[] | ProfessionalLicenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutUserInput | ProfessionalLicenseCreateOrConnectWithoutUserInput[]
    createMany?: ProfessionalLicenseCreateManyUserInputEnvelope
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
  }

  export type WorkExperienceCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkExperienceCreateWithoutUserInput, WorkExperienceUncheckedCreateWithoutUserInput> | WorkExperienceCreateWithoutUserInput[] | WorkExperienceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkExperienceCreateOrConnectWithoutUserInput | WorkExperienceCreateOrConnectWithoutUserInput[]
    createMany?: WorkExperienceCreateManyUserInputEnvelope
    connect?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
  }

  export type ProfessionalAffiliationCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutUserInput, ProfessionalAffiliationUncheckedCreateWithoutUserInput> | ProfessionalAffiliationCreateWithoutUserInput[] | ProfessionalAffiliationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutUserInput | ProfessionalAffiliationCreateOrConnectWithoutUserInput[]
    createMany?: ProfessionalAffiliationCreateManyUserInputEnvelope
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
  }

  export type AwardRecognitionCreateNestedManyWithoutUserInput = {
    create?: XOR<AwardRecognitionCreateWithoutUserInput, AwardRecognitionUncheckedCreateWithoutUserInput> | AwardRecognitionCreateWithoutUserInput[] | AwardRecognitionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AwardRecognitionCreateOrConnectWithoutUserInput | AwardRecognitionCreateOrConnectWithoutUserInput[]
    createMany?: AwardRecognitionCreateManyUserInputEnvelope
    connect?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
  }

  export type ProfessionalDevelopmentCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessionalDevelopmentCreateWithoutUserInput, ProfessionalDevelopmentUncheckedCreateWithoutUserInput> | ProfessionalDevelopmentCreateWithoutUserInput[] | ProfessionalDevelopmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalDevelopmentCreateOrConnectWithoutUserInput | ProfessionalDevelopmentCreateOrConnectWithoutUserInput[]
    createMany?: ProfessionalDevelopmentCreateManyUserInputEnvelope
    connect?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
  }

  export type CommunityInvolvementCreateNestedManyWithoutUserInput = {
    create?: XOR<CommunityInvolvementCreateWithoutUserInput, CommunityInvolvementUncheckedCreateWithoutUserInput> | CommunityInvolvementCreateWithoutUserInput[] | CommunityInvolvementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityInvolvementCreateOrConnectWithoutUserInput | CommunityInvolvementCreateOrConnectWithoutUserInput[]
    createMany?: CommunityInvolvementCreateManyUserInputEnvelope
    connect?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
  }

  export type PublicationCreateNestedManyWithoutUserInput = {
    create?: XOR<PublicationCreateWithoutUserInput, PublicationUncheckedCreateWithoutUserInput> | PublicationCreateWithoutUserInput[] | PublicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutUserInput | PublicationCreateOrConnectWithoutUserInput[]
    createMany?: PublicationCreateManyUserInputEnvelope
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
  }

  export type ConferencePresentationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConferencePresentationCreateWithoutUserInput, ConferencePresentationUncheckedCreateWithoutUserInput> | ConferencePresentationCreateWithoutUserInput[] | ConferencePresentationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConferencePresentationCreateOrConnectWithoutUserInput | ConferencePresentationCreateOrConnectWithoutUserInput[]
    createMany?: ConferencePresentationCreateManyUserInputEnvelope
    connect?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
  }

  export type AcademicQualificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AcademicQualificationCreateWithoutUserInput, AcademicQualificationUncheckedCreateWithoutUserInput> | AcademicQualificationCreateWithoutUserInput[] | AcademicQualificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AcademicQualificationCreateOrConnectWithoutUserInput | AcademicQualificationCreateOrConnectWithoutUserInput[]
    createMany?: AcademicQualificationCreateManyUserInputEnvelope
    connect?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
  }

  export type ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutUserInput, ProfessionalLicenseUncheckedCreateWithoutUserInput> | ProfessionalLicenseCreateWithoutUserInput[] | ProfessionalLicenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutUserInput | ProfessionalLicenseCreateOrConnectWithoutUserInput[]
    createMany?: ProfessionalLicenseCreateManyUserInputEnvelope
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
  }

  export type WorkExperienceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkExperienceCreateWithoutUserInput, WorkExperienceUncheckedCreateWithoutUserInput> | WorkExperienceCreateWithoutUserInput[] | WorkExperienceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkExperienceCreateOrConnectWithoutUserInput | WorkExperienceCreateOrConnectWithoutUserInput[]
    createMany?: WorkExperienceCreateManyUserInputEnvelope
    connect?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
  }

  export type ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutUserInput, ProfessionalAffiliationUncheckedCreateWithoutUserInput> | ProfessionalAffiliationCreateWithoutUserInput[] | ProfessionalAffiliationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutUserInput | ProfessionalAffiliationCreateOrConnectWithoutUserInput[]
    createMany?: ProfessionalAffiliationCreateManyUserInputEnvelope
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
  }

  export type AwardRecognitionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AwardRecognitionCreateWithoutUserInput, AwardRecognitionUncheckedCreateWithoutUserInput> | AwardRecognitionCreateWithoutUserInput[] | AwardRecognitionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AwardRecognitionCreateOrConnectWithoutUserInput | AwardRecognitionCreateOrConnectWithoutUserInput[]
    createMany?: AwardRecognitionCreateManyUserInputEnvelope
    connect?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
  }

  export type ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfessionalDevelopmentCreateWithoutUserInput, ProfessionalDevelopmentUncheckedCreateWithoutUserInput> | ProfessionalDevelopmentCreateWithoutUserInput[] | ProfessionalDevelopmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalDevelopmentCreateOrConnectWithoutUserInput | ProfessionalDevelopmentCreateOrConnectWithoutUserInput[]
    createMany?: ProfessionalDevelopmentCreateManyUserInputEnvelope
    connect?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
  }

  export type CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommunityInvolvementCreateWithoutUserInput, CommunityInvolvementUncheckedCreateWithoutUserInput> | CommunityInvolvementCreateWithoutUserInput[] | CommunityInvolvementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityInvolvementCreateOrConnectWithoutUserInput | CommunityInvolvementCreateOrConnectWithoutUserInput[]
    createMany?: CommunityInvolvementCreateManyUserInputEnvelope
    connect?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
  }

  export type PublicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PublicationCreateWithoutUserInput, PublicationUncheckedCreateWithoutUserInput> | PublicationCreateWithoutUserInput[] | PublicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutUserInput | PublicationCreateOrConnectWithoutUserInput[]
    createMany?: PublicationCreateManyUserInputEnvelope
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
  }

  export type ConferencePresentationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConferencePresentationCreateWithoutUserInput, ConferencePresentationUncheckedCreateWithoutUserInput> | ConferencePresentationCreateWithoutUserInput[] | ConferencePresentationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConferencePresentationCreateOrConnectWithoutUserInput | ConferencePresentationCreateOrConnectWithoutUserInput[]
    createMany?: ConferencePresentationCreateManyUserInputEnvelope
    connect?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AcademicQualificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<AcademicQualificationCreateWithoutUserInput, AcademicQualificationUncheckedCreateWithoutUserInput> | AcademicQualificationCreateWithoutUserInput[] | AcademicQualificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AcademicQualificationCreateOrConnectWithoutUserInput | AcademicQualificationCreateOrConnectWithoutUserInput[]
    upsert?: AcademicQualificationUpsertWithWhereUniqueWithoutUserInput | AcademicQualificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AcademicQualificationCreateManyUserInputEnvelope
    set?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    disconnect?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    delete?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    connect?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    update?: AcademicQualificationUpdateWithWhereUniqueWithoutUserInput | AcademicQualificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AcademicQualificationUpdateManyWithWhereWithoutUserInput | AcademicQualificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AcademicQualificationScalarWhereInput | AcademicQualificationScalarWhereInput[]
  }

  export type ProfessionalLicenseUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutUserInput, ProfessionalLicenseUncheckedCreateWithoutUserInput> | ProfessionalLicenseCreateWithoutUserInput[] | ProfessionalLicenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutUserInput | ProfessionalLicenseCreateOrConnectWithoutUserInput[]
    upsert?: ProfessionalLicenseUpsertWithWhereUniqueWithoutUserInput | ProfessionalLicenseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessionalLicenseCreateManyUserInputEnvelope
    set?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    disconnect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    delete?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    update?: ProfessionalLicenseUpdateWithWhereUniqueWithoutUserInput | ProfessionalLicenseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessionalLicenseUpdateManyWithWhereWithoutUserInput | ProfessionalLicenseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
  }

  export type WorkExperienceUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkExperienceCreateWithoutUserInput, WorkExperienceUncheckedCreateWithoutUserInput> | WorkExperienceCreateWithoutUserInput[] | WorkExperienceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkExperienceCreateOrConnectWithoutUserInput | WorkExperienceCreateOrConnectWithoutUserInput[]
    upsert?: WorkExperienceUpsertWithWhereUniqueWithoutUserInput | WorkExperienceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkExperienceCreateManyUserInputEnvelope
    set?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    disconnect?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    delete?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    connect?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    update?: WorkExperienceUpdateWithWhereUniqueWithoutUserInput | WorkExperienceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkExperienceUpdateManyWithWhereWithoutUserInput | WorkExperienceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkExperienceScalarWhereInput | WorkExperienceScalarWhereInput[]
  }

  export type ProfessionalAffiliationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutUserInput, ProfessionalAffiliationUncheckedCreateWithoutUserInput> | ProfessionalAffiliationCreateWithoutUserInput[] | ProfessionalAffiliationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutUserInput | ProfessionalAffiliationCreateOrConnectWithoutUserInput[]
    upsert?: ProfessionalAffiliationUpsertWithWhereUniqueWithoutUserInput | ProfessionalAffiliationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessionalAffiliationCreateManyUserInputEnvelope
    set?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    disconnect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    delete?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    update?: ProfessionalAffiliationUpdateWithWhereUniqueWithoutUserInput | ProfessionalAffiliationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessionalAffiliationUpdateManyWithWhereWithoutUserInput | ProfessionalAffiliationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
  }

  export type AwardRecognitionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AwardRecognitionCreateWithoutUserInput, AwardRecognitionUncheckedCreateWithoutUserInput> | AwardRecognitionCreateWithoutUserInput[] | AwardRecognitionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AwardRecognitionCreateOrConnectWithoutUserInput | AwardRecognitionCreateOrConnectWithoutUserInput[]
    upsert?: AwardRecognitionUpsertWithWhereUniqueWithoutUserInput | AwardRecognitionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AwardRecognitionCreateManyUserInputEnvelope
    set?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    disconnect?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    delete?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    connect?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    update?: AwardRecognitionUpdateWithWhereUniqueWithoutUserInput | AwardRecognitionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AwardRecognitionUpdateManyWithWhereWithoutUserInput | AwardRecognitionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AwardRecognitionScalarWhereInput | AwardRecognitionScalarWhereInput[]
  }

  export type ProfessionalDevelopmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessionalDevelopmentCreateWithoutUserInput, ProfessionalDevelopmentUncheckedCreateWithoutUserInput> | ProfessionalDevelopmentCreateWithoutUserInput[] | ProfessionalDevelopmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalDevelopmentCreateOrConnectWithoutUserInput | ProfessionalDevelopmentCreateOrConnectWithoutUserInput[]
    upsert?: ProfessionalDevelopmentUpsertWithWhereUniqueWithoutUserInput | ProfessionalDevelopmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessionalDevelopmentCreateManyUserInputEnvelope
    set?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    disconnect?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    delete?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    connect?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    update?: ProfessionalDevelopmentUpdateWithWhereUniqueWithoutUserInput | ProfessionalDevelopmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessionalDevelopmentUpdateManyWithWhereWithoutUserInput | ProfessionalDevelopmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessionalDevelopmentScalarWhereInput | ProfessionalDevelopmentScalarWhereInput[]
  }

  export type CommunityInvolvementUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommunityInvolvementCreateWithoutUserInput, CommunityInvolvementUncheckedCreateWithoutUserInput> | CommunityInvolvementCreateWithoutUserInput[] | CommunityInvolvementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityInvolvementCreateOrConnectWithoutUserInput | CommunityInvolvementCreateOrConnectWithoutUserInput[]
    upsert?: CommunityInvolvementUpsertWithWhereUniqueWithoutUserInput | CommunityInvolvementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommunityInvolvementCreateManyUserInputEnvelope
    set?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    disconnect?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    delete?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    connect?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    update?: CommunityInvolvementUpdateWithWhereUniqueWithoutUserInput | CommunityInvolvementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommunityInvolvementUpdateManyWithWhereWithoutUserInput | CommunityInvolvementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommunityInvolvementScalarWhereInput | CommunityInvolvementScalarWhereInput[]
  }

  export type PublicationUpdateManyWithoutUserNestedInput = {
    create?: XOR<PublicationCreateWithoutUserInput, PublicationUncheckedCreateWithoutUserInput> | PublicationCreateWithoutUserInput[] | PublicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutUserInput | PublicationCreateOrConnectWithoutUserInput[]
    upsert?: PublicationUpsertWithWhereUniqueWithoutUserInput | PublicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PublicationCreateManyUserInputEnvelope
    set?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    disconnect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    delete?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    update?: PublicationUpdateWithWhereUniqueWithoutUserInput | PublicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PublicationUpdateManyWithWhereWithoutUserInput | PublicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
  }

  export type ConferencePresentationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConferencePresentationCreateWithoutUserInput, ConferencePresentationUncheckedCreateWithoutUserInput> | ConferencePresentationCreateWithoutUserInput[] | ConferencePresentationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConferencePresentationCreateOrConnectWithoutUserInput | ConferencePresentationCreateOrConnectWithoutUserInput[]
    upsert?: ConferencePresentationUpsertWithWhereUniqueWithoutUserInput | ConferencePresentationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConferencePresentationCreateManyUserInputEnvelope
    set?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    disconnect?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    delete?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    connect?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    update?: ConferencePresentationUpdateWithWhereUniqueWithoutUserInput | ConferencePresentationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConferencePresentationUpdateManyWithWhereWithoutUserInput | ConferencePresentationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConferencePresentationScalarWhereInput | ConferencePresentationScalarWhereInput[]
  }

  export type AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AcademicQualificationCreateWithoutUserInput, AcademicQualificationUncheckedCreateWithoutUserInput> | AcademicQualificationCreateWithoutUserInput[] | AcademicQualificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AcademicQualificationCreateOrConnectWithoutUserInput | AcademicQualificationCreateOrConnectWithoutUserInput[]
    upsert?: AcademicQualificationUpsertWithWhereUniqueWithoutUserInput | AcademicQualificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AcademicQualificationCreateManyUserInputEnvelope
    set?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    disconnect?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    delete?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    connect?: AcademicQualificationWhereUniqueInput | AcademicQualificationWhereUniqueInput[]
    update?: AcademicQualificationUpdateWithWhereUniqueWithoutUserInput | AcademicQualificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AcademicQualificationUpdateManyWithWhereWithoutUserInput | AcademicQualificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AcademicQualificationScalarWhereInput | AcademicQualificationScalarWhereInput[]
  }

  export type ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutUserInput, ProfessionalLicenseUncheckedCreateWithoutUserInput> | ProfessionalLicenseCreateWithoutUserInput[] | ProfessionalLicenseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutUserInput | ProfessionalLicenseCreateOrConnectWithoutUserInput[]
    upsert?: ProfessionalLicenseUpsertWithWhereUniqueWithoutUserInput | ProfessionalLicenseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessionalLicenseCreateManyUserInputEnvelope
    set?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    disconnect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    delete?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    update?: ProfessionalLicenseUpdateWithWhereUniqueWithoutUserInput | ProfessionalLicenseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessionalLicenseUpdateManyWithWhereWithoutUserInput | ProfessionalLicenseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
  }

  export type WorkExperienceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkExperienceCreateWithoutUserInput, WorkExperienceUncheckedCreateWithoutUserInput> | WorkExperienceCreateWithoutUserInput[] | WorkExperienceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkExperienceCreateOrConnectWithoutUserInput | WorkExperienceCreateOrConnectWithoutUserInput[]
    upsert?: WorkExperienceUpsertWithWhereUniqueWithoutUserInput | WorkExperienceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkExperienceCreateManyUserInputEnvelope
    set?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    disconnect?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    delete?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    connect?: WorkExperienceWhereUniqueInput | WorkExperienceWhereUniqueInput[]
    update?: WorkExperienceUpdateWithWhereUniqueWithoutUserInput | WorkExperienceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkExperienceUpdateManyWithWhereWithoutUserInput | WorkExperienceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkExperienceScalarWhereInput | WorkExperienceScalarWhereInput[]
  }

  export type ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutUserInput, ProfessionalAffiliationUncheckedCreateWithoutUserInput> | ProfessionalAffiliationCreateWithoutUserInput[] | ProfessionalAffiliationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutUserInput | ProfessionalAffiliationCreateOrConnectWithoutUserInput[]
    upsert?: ProfessionalAffiliationUpsertWithWhereUniqueWithoutUserInput | ProfessionalAffiliationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessionalAffiliationCreateManyUserInputEnvelope
    set?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    disconnect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    delete?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    update?: ProfessionalAffiliationUpdateWithWhereUniqueWithoutUserInput | ProfessionalAffiliationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessionalAffiliationUpdateManyWithWhereWithoutUserInput | ProfessionalAffiliationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
  }

  export type AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AwardRecognitionCreateWithoutUserInput, AwardRecognitionUncheckedCreateWithoutUserInput> | AwardRecognitionCreateWithoutUserInput[] | AwardRecognitionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AwardRecognitionCreateOrConnectWithoutUserInput | AwardRecognitionCreateOrConnectWithoutUserInput[]
    upsert?: AwardRecognitionUpsertWithWhereUniqueWithoutUserInput | AwardRecognitionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AwardRecognitionCreateManyUserInputEnvelope
    set?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    disconnect?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    delete?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    connect?: AwardRecognitionWhereUniqueInput | AwardRecognitionWhereUniqueInput[]
    update?: AwardRecognitionUpdateWithWhereUniqueWithoutUserInput | AwardRecognitionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AwardRecognitionUpdateManyWithWhereWithoutUserInput | AwardRecognitionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AwardRecognitionScalarWhereInput | AwardRecognitionScalarWhereInput[]
  }

  export type ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfessionalDevelopmentCreateWithoutUserInput, ProfessionalDevelopmentUncheckedCreateWithoutUserInput> | ProfessionalDevelopmentCreateWithoutUserInput[] | ProfessionalDevelopmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfessionalDevelopmentCreateOrConnectWithoutUserInput | ProfessionalDevelopmentCreateOrConnectWithoutUserInput[]
    upsert?: ProfessionalDevelopmentUpsertWithWhereUniqueWithoutUserInput | ProfessionalDevelopmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfessionalDevelopmentCreateManyUserInputEnvelope
    set?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    disconnect?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    delete?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    connect?: ProfessionalDevelopmentWhereUniqueInput | ProfessionalDevelopmentWhereUniqueInput[]
    update?: ProfessionalDevelopmentUpdateWithWhereUniqueWithoutUserInput | ProfessionalDevelopmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfessionalDevelopmentUpdateManyWithWhereWithoutUserInput | ProfessionalDevelopmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfessionalDevelopmentScalarWhereInput | ProfessionalDevelopmentScalarWhereInput[]
  }

  export type CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommunityInvolvementCreateWithoutUserInput, CommunityInvolvementUncheckedCreateWithoutUserInput> | CommunityInvolvementCreateWithoutUserInput[] | CommunityInvolvementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommunityInvolvementCreateOrConnectWithoutUserInput | CommunityInvolvementCreateOrConnectWithoutUserInput[]
    upsert?: CommunityInvolvementUpsertWithWhereUniqueWithoutUserInput | CommunityInvolvementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommunityInvolvementCreateManyUserInputEnvelope
    set?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    disconnect?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    delete?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    connect?: CommunityInvolvementWhereUniqueInput | CommunityInvolvementWhereUniqueInput[]
    update?: CommunityInvolvementUpdateWithWhereUniqueWithoutUserInput | CommunityInvolvementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommunityInvolvementUpdateManyWithWhereWithoutUserInput | CommunityInvolvementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommunityInvolvementScalarWhereInput | CommunityInvolvementScalarWhereInput[]
  }

  export type PublicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PublicationCreateWithoutUserInput, PublicationUncheckedCreateWithoutUserInput> | PublicationCreateWithoutUserInput[] | PublicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutUserInput | PublicationCreateOrConnectWithoutUserInput[]
    upsert?: PublicationUpsertWithWhereUniqueWithoutUserInput | PublicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PublicationCreateManyUserInputEnvelope
    set?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    disconnect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    delete?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    update?: PublicationUpdateWithWhereUniqueWithoutUserInput | PublicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PublicationUpdateManyWithWhereWithoutUserInput | PublicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
  }

  export type ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConferencePresentationCreateWithoutUserInput, ConferencePresentationUncheckedCreateWithoutUserInput> | ConferencePresentationCreateWithoutUserInput[] | ConferencePresentationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConferencePresentationCreateOrConnectWithoutUserInput | ConferencePresentationCreateOrConnectWithoutUserInput[]
    upsert?: ConferencePresentationUpsertWithWhereUniqueWithoutUserInput | ConferencePresentationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConferencePresentationCreateManyUserInputEnvelope
    set?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    disconnect?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    delete?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    connect?: ConferencePresentationWhereUniqueInput | ConferencePresentationWhereUniqueInput[]
    update?: ConferencePresentationUpdateWithWhereUniqueWithoutUserInput | ConferencePresentationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConferencePresentationUpdateManyWithWhereWithoutUserInput | ConferencePresentationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConferencePresentationScalarWhereInput | ConferencePresentationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAcademicQualificationsInput = {
    create?: XOR<UserCreateWithoutAcademicQualificationsInput, UserUncheckedCreateWithoutAcademicQualificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAcademicQualificationsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumApprovalStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApprovalStatus
  }

  export type UserUpdateOneRequiredWithoutAcademicQualificationsNestedInput = {
    create?: XOR<UserCreateWithoutAcademicQualificationsInput, UserUncheckedCreateWithoutAcademicQualificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAcademicQualificationsInput
    upsert?: UserUpsertWithoutAcademicQualificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAcademicQualificationsInput, UserUpdateWithoutAcademicQualificationsInput>, UserUncheckedUpdateWithoutAcademicQualificationsInput>
  }

  export type UserCreateNestedOneWithoutProfessionalLicensesInput = {
    create?: XOR<UserCreateWithoutProfessionalLicensesInput, UserUncheckedCreateWithoutProfessionalLicensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalLicensesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfessionalLicensesNestedInput = {
    create?: XOR<UserCreateWithoutProfessionalLicensesInput, UserUncheckedCreateWithoutProfessionalLicensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalLicensesInput
    upsert?: UserUpsertWithoutProfessionalLicensesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfessionalLicensesInput, UserUpdateWithoutProfessionalLicensesInput>, UserUncheckedUpdateWithoutProfessionalLicensesInput>
  }

  export type UserCreateNestedOneWithoutWorkExperiencesInput = {
    create?: XOR<UserCreateWithoutWorkExperiencesInput, UserUncheckedCreateWithoutWorkExperiencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkExperiencesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWorkExperiencesNestedInput = {
    create?: XOR<UserCreateWithoutWorkExperiencesInput, UserUncheckedCreateWithoutWorkExperiencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkExperiencesInput
    upsert?: UserUpsertWithoutWorkExperiencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkExperiencesInput, UserUpdateWithoutWorkExperiencesInput>, UserUncheckedUpdateWithoutWorkExperiencesInput>
  }

  export type UserCreateNestedOneWithoutProfessionalAffiliationsInput = {
    create?: XOR<UserCreateWithoutProfessionalAffiliationsInput, UserUncheckedCreateWithoutProfessionalAffiliationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalAffiliationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfessionalAffiliationsNestedInput = {
    create?: XOR<UserCreateWithoutProfessionalAffiliationsInput, UserUncheckedCreateWithoutProfessionalAffiliationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalAffiliationsInput
    upsert?: UserUpsertWithoutProfessionalAffiliationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfessionalAffiliationsInput, UserUpdateWithoutProfessionalAffiliationsInput>, UserUncheckedUpdateWithoutProfessionalAffiliationsInput>
  }

  export type UserCreateNestedOneWithoutAwardsRecognitionsInput = {
    create?: XOR<UserCreateWithoutAwardsRecognitionsInput, UserUncheckedCreateWithoutAwardsRecognitionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAwardsRecognitionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAwardsRecognitionsNestedInput = {
    create?: XOR<UserCreateWithoutAwardsRecognitionsInput, UserUncheckedCreateWithoutAwardsRecognitionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAwardsRecognitionsInput
    upsert?: UserUpsertWithoutAwardsRecognitionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAwardsRecognitionsInput, UserUpdateWithoutAwardsRecognitionsInput>, UserUncheckedUpdateWithoutAwardsRecognitionsInput>
  }

  export type UserCreateNestedOneWithoutProfessionalDevelopmentsInput = {
    create?: XOR<UserCreateWithoutProfessionalDevelopmentsInput, UserUncheckedCreateWithoutProfessionalDevelopmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalDevelopmentsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfessionalDevelopmentsNestedInput = {
    create?: XOR<UserCreateWithoutProfessionalDevelopmentsInput, UserUncheckedCreateWithoutProfessionalDevelopmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalDevelopmentsInput
    upsert?: UserUpsertWithoutProfessionalDevelopmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfessionalDevelopmentsInput, UserUpdateWithoutProfessionalDevelopmentsInput>, UserUncheckedUpdateWithoutProfessionalDevelopmentsInput>
  }

  export type UserCreateNestedOneWithoutCommunityInvolvementsInput = {
    create?: XOR<UserCreateWithoutCommunityInvolvementsInput, UserUncheckedCreateWithoutCommunityInvolvementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommunityInvolvementsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommunityInvolvementsNestedInput = {
    create?: XOR<UserCreateWithoutCommunityInvolvementsInput, UserUncheckedCreateWithoutCommunityInvolvementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommunityInvolvementsInput
    upsert?: UserUpsertWithoutCommunityInvolvementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommunityInvolvementsInput, UserUpdateWithoutCommunityInvolvementsInput>, UserUncheckedUpdateWithoutCommunityInvolvementsInput>
  }

  export type UserCreateNestedOneWithoutPublicationsInput = {
    create?: XOR<UserCreateWithoutPublicationsInput, UserUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPublicationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPublicationsNestedInput = {
    create?: XOR<UserCreateWithoutPublicationsInput, UserUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPublicationsInput
    upsert?: UserUpsertWithoutPublicationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPublicationsInput, UserUpdateWithoutPublicationsInput>, UserUncheckedUpdateWithoutPublicationsInput>
  }

  export type UserCreateNestedOneWithoutConferencePresentationsInput = {
    create?: XOR<UserCreateWithoutConferencePresentationsInput, UserUncheckedCreateWithoutConferencePresentationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConferencePresentationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutConferencePresentationsNestedInput = {
    create?: XOR<UserCreateWithoutConferencePresentationsInput, UserUncheckedCreateWithoutConferencePresentationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConferencePresentationsInput
    upsert?: UserUpsertWithoutConferencePresentationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConferencePresentationsInput, UserUpdateWithoutConferencePresentationsInput>, UserUncheckedUpdateWithoutConferencePresentationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalStatus | EnumApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalStatus[]
    notIn?: $Enums.ApprovalStatus[]
    not?: NestedEnumApprovalStatusFilter<$PrismaModel> | $Enums.ApprovalStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumApprovalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalStatus | EnumApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApprovalStatus[]
    notIn?: $Enums.ApprovalStatus[]
    not?: NestedEnumApprovalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApprovalStatusFilter<$PrismaModel>
    _max?: NestedEnumApprovalStatusFilter<$PrismaModel>
  }

  export type AcademicQualificationCreateWithoutUserInput = {
    id?: string
    degree: string
    institution: string
    program: string
    yearCompleted: number
    createdAt?: Date | string
    updatedAt?: Date | string
    diplomaFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AcademicQualificationUncheckedCreateWithoutUserInput = {
    id?: string
    degree: string
    institution: string
    program: string
    yearCompleted: number
    createdAt?: Date | string
    updatedAt?: Date | string
    diplomaFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AcademicQualificationCreateOrConnectWithoutUserInput = {
    where: AcademicQualificationWhereUniqueInput
    create: XOR<AcademicQualificationCreateWithoutUserInput, AcademicQualificationUncheckedCreateWithoutUserInput>
  }

  export type AcademicQualificationCreateManyUserInputEnvelope = {
    data: AcademicQualificationCreateManyUserInput | AcademicQualificationCreateManyUserInput[]
  }

  export type ProfessionalLicenseCreateWithoutUserInput = {
    id?: string
    examination: string
    monthYear: string
    licenseNumber: string
    expiration: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    licenseFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalLicenseUncheckedCreateWithoutUserInput = {
    id?: string
    examination: string
    monthYear: string
    licenseNumber: string
    expiration: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    licenseFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalLicenseCreateOrConnectWithoutUserInput = {
    where: ProfessionalLicenseWhereUniqueInput
    create: XOR<ProfessionalLicenseCreateWithoutUserInput, ProfessionalLicenseUncheckedCreateWithoutUserInput>
  }

  export type ProfessionalLicenseCreateManyUserInputEnvelope = {
    data: ProfessionalLicenseCreateManyUserInput | ProfessionalLicenseCreateManyUserInput[]
  }

  export type WorkExperienceCreateWithoutUserInput = {
    id?: string
    institution: string
    position: string
    natureOfWork?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type WorkExperienceUncheckedCreateWithoutUserInput = {
    id?: string
    institution: string
    position: string
    natureOfWork?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type WorkExperienceCreateOrConnectWithoutUserInput = {
    where: WorkExperienceWhereUniqueInput
    create: XOR<WorkExperienceCreateWithoutUserInput, WorkExperienceUncheckedCreateWithoutUserInput>
  }

  export type WorkExperienceCreateManyUserInputEnvelope = {
    data: WorkExperienceCreateManyUserInput | WorkExperienceCreateManyUserInput[]
  }

  export type ProfessionalAffiliationCreateWithoutUserInput = {
    id?: string
    organization: string
    position?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    membershipProofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalAffiliationUncheckedCreateWithoutUserInput = {
    id?: string
    organization: string
    position?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    membershipProofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalAffiliationCreateOrConnectWithoutUserInput = {
    where: ProfessionalAffiliationWhereUniqueInput
    create: XOR<ProfessionalAffiliationCreateWithoutUserInput, ProfessionalAffiliationUncheckedCreateWithoutUserInput>
  }

  export type ProfessionalAffiliationCreateManyUserInputEnvelope = {
    data: ProfessionalAffiliationCreateManyUserInput | ProfessionalAffiliationCreateManyUserInput[]
  }

  export type AwardRecognitionCreateWithoutUserInput = {
    id?: string
    awardName: string
    awardingBody: string
    yearReceived: number
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AwardRecognitionUncheckedCreateWithoutUserInput = {
    id?: string
    awardName: string
    awardingBody: string
    yearReceived: number
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AwardRecognitionCreateOrConnectWithoutUserInput = {
    where: AwardRecognitionWhereUniqueInput
    create: XOR<AwardRecognitionCreateWithoutUserInput, AwardRecognitionUncheckedCreateWithoutUserInput>
  }

  export type AwardRecognitionCreateManyUserInputEnvelope = {
    data: AwardRecognitionCreateManyUserInput | AwardRecognitionCreateManyUserInput[]
  }

  export type ProfessionalDevelopmentCreateWithoutUserInput = {
    id?: string
    title: string
    organizer: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalDevelopmentUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    organizer: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalDevelopmentCreateOrConnectWithoutUserInput = {
    where: ProfessionalDevelopmentWhereUniqueInput
    create: XOR<ProfessionalDevelopmentCreateWithoutUserInput, ProfessionalDevelopmentUncheckedCreateWithoutUserInput>
  }

  export type ProfessionalDevelopmentCreateManyUserInputEnvelope = {
    data: ProfessionalDevelopmentCreateManyUserInput | ProfessionalDevelopmentCreateManyUserInput[]
  }

  export type CommunityInvolvementCreateWithoutUserInput = {
    id?: string
    engagementTitle: string
    role: string
    locationDate: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type CommunityInvolvementUncheckedCreateWithoutUserInput = {
    id?: string
    engagementTitle: string
    role: string
    locationDate: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type CommunityInvolvementCreateOrConnectWithoutUserInput = {
    where: CommunityInvolvementWhereUniqueInput
    create: XOR<CommunityInvolvementCreateWithoutUserInput, CommunityInvolvementUncheckedCreateWithoutUserInput>
  }

  export type CommunityInvolvementCreateManyUserInputEnvelope = {
    data: CommunityInvolvementCreateManyUserInput | CommunityInvolvementCreateManyUserInput[]
  }

  export type PublicationCreateWithoutUserInput = {
    id?: string
    researchTitle: string
    journal: string
    datePublished: Date | string
    doiLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pdfUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type PublicationUncheckedCreateWithoutUserInput = {
    id?: string
    researchTitle: string
    journal: string
    datePublished: Date | string
    doiLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pdfUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type PublicationCreateOrConnectWithoutUserInput = {
    where: PublicationWhereUniqueInput
    create: XOR<PublicationCreateWithoutUserInput, PublicationUncheckedCreateWithoutUserInput>
  }

  export type PublicationCreateManyUserInputEnvelope = {
    data: PublicationCreateManyUserInput | PublicationCreateManyUserInput[]
  }

  export type ConferencePresentationCreateWithoutUserInput = {
    id?: string
    paperTitle: string
    eventName: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ConferencePresentationUncheckedCreateWithoutUserInput = {
    id?: string
    paperTitle: string
    eventName: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ConferencePresentationCreateOrConnectWithoutUserInput = {
    where: ConferencePresentationWhereUniqueInput
    create: XOR<ConferencePresentationCreateWithoutUserInput, ConferencePresentationUncheckedCreateWithoutUserInput>
  }

  export type ConferencePresentationCreateManyUserInputEnvelope = {
    data: ConferencePresentationCreateManyUserInput | ConferencePresentationCreateManyUserInput[]
  }

  export type AcademicQualificationUpsertWithWhereUniqueWithoutUserInput = {
    where: AcademicQualificationWhereUniqueInput
    update: XOR<AcademicQualificationUpdateWithoutUserInput, AcademicQualificationUncheckedUpdateWithoutUserInput>
    create: XOR<AcademicQualificationCreateWithoutUserInput, AcademicQualificationUncheckedCreateWithoutUserInput>
  }

  export type AcademicQualificationUpdateWithWhereUniqueWithoutUserInput = {
    where: AcademicQualificationWhereUniqueInput
    data: XOR<AcademicQualificationUpdateWithoutUserInput, AcademicQualificationUncheckedUpdateWithoutUserInput>
  }

  export type AcademicQualificationUpdateManyWithWhereWithoutUserInput = {
    where: AcademicQualificationScalarWhereInput
    data: XOR<AcademicQualificationUpdateManyMutationInput, AcademicQualificationUncheckedUpdateManyWithoutUserInput>
  }

  export type AcademicQualificationScalarWhereInput = {
    AND?: AcademicQualificationScalarWhereInput | AcademicQualificationScalarWhereInput[]
    OR?: AcademicQualificationScalarWhereInput[]
    NOT?: AcademicQualificationScalarWhereInput | AcademicQualificationScalarWhereInput[]
    id?: StringFilter<"AcademicQualification"> | string
    degree?: StringFilter<"AcademicQualification"> | string
    institution?: StringFilter<"AcademicQualification"> | string
    program?: StringFilter<"AcademicQualification"> | string
    yearCompleted?: IntFilter<"AcademicQualification"> | number
    createdAt?: DateTimeFilter<"AcademicQualification"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicQualification"> | Date | string
    userId?: StringFilter<"AcademicQualification"> | string
    diplomaFileUrl?: StringNullableFilter<"AcademicQualification"> | string | null
    status?: EnumApprovalStatusFilter<"AcademicQualification"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"AcademicQualification"> | string | null
  }

  export type ProfessionalLicenseUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfessionalLicenseWhereUniqueInput
    update: XOR<ProfessionalLicenseUpdateWithoutUserInput, ProfessionalLicenseUncheckedUpdateWithoutUserInput>
    create: XOR<ProfessionalLicenseCreateWithoutUserInput, ProfessionalLicenseUncheckedCreateWithoutUserInput>
  }

  export type ProfessionalLicenseUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfessionalLicenseWhereUniqueInput
    data: XOR<ProfessionalLicenseUpdateWithoutUserInput, ProfessionalLicenseUncheckedUpdateWithoutUserInput>
  }

  export type ProfessionalLicenseUpdateManyWithWhereWithoutUserInput = {
    where: ProfessionalLicenseScalarWhereInput
    data: XOR<ProfessionalLicenseUpdateManyMutationInput, ProfessionalLicenseUncheckedUpdateManyWithoutUserInput>
  }

  export type ProfessionalLicenseScalarWhereInput = {
    AND?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
    OR?: ProfessionalLicenseScalarWhereInput[]
    NOT?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
    id?: StringFilter<"ProfessionalLicense"> | string
    examination?: StringFilter<"ProfessionalLicense"> | string
    monthYear?: StringFilter<"ProfessionalLicense"> | string
    licenseNumber?: StringFilter<"ProfessionalLicense"> | string
    expiration?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    createdAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    userId?: StringFilter<"ProfessionalLicense"> | string
    licenseFileUrl?: StringNullableFilter<"ProfessionalLicense"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalLicense"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalLicense"> | string | null
  }

  export type WorkExperienceUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkExperienceWhereUniqueInput
    update: XOR<WorkExperienceUpdateWithoutUserInput, WorkExperienceUncheckedUpdateWithoutUserInput>
    create: XOR<WorkExperienceCreateWithoutUserInput, WorkExperienceUncheckedCreateWithoutUserInput>
  }

  export type WorkExperienceUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkExperienceWhereUniqueInput
    data: XOR<WorkExperienceUpdateWithoutUserInput, WorkExperienceUncheckedUpdateWithoutUserInput>
  }

  export type WorkExperienceUpdateManyWithWhereWithoutUserInput = {
    where: WorkExperienceScalarWhereInput
    data: XOR<WorkExperienceUpdateManyMutationInput, WorkExperienceUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkExperienceScalarWhereInput = {
    AND?: WorkExperienceScalarWhereInput | WorkExperienceScalarWhereInput[]
    OR?: WorkExperienceScalarWhereInput[]
    NOT?: WorkExperienceScalarWhereInput | WorkExperienceScalarWhereInput[]
    id?: StringFilter<"WorkExperience"> | string
    institution?: StringFilter<"WorkExperience"> | string
    position?: StringFilter<"WorkExperience"> | string
    natureOfWork?: StringNullableFilter<"WorkExperience"> | string | null
    inclusiveYears?: StringFilter<"WorkExperience"> | string
    createdAt?: DateTimeFilter<"WorkExperience"> | Date | string
    updatedAt?: DateTimeFilter<"WorkExperience"> | Date | string
    userId?: StringFilter<"WorkExperience"> | string
    proofUrl?: StringNullableFilter<"WorkExperience"> | string | null
    status?: EnumApprovalStatusFilter<"WorkExperience"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"WorkExperience"> | string | null
  }

  export type ProfessionalAffiliationUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfessionalAffiliationWhereUniqueInput
    update: XOR<ProfessionalAffiliationUpdateWithoutUserInput, ProfessionalAffiliationUncheckedUpdateWithoutUserInput>
    create: XOR<ProfessionalAffiliationCreateWithoutUserInput, ProfessionalAffiliationUncheckedCreateWithoutUserInput>
  }

  export type ProfessionalAffiliationUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfessionalAffiliationWhereUniqueInput
    data: XOR<ProfessionalAffiliationUpdateWithoutUserInput, ProfessionalAffiliationUncheckedUpdateWithoutUserInput>
  }

  export type ProfessionalAffiliationUpdateManyWithWhereWithoutUserInput = {
    where: ProfessionalAffiliationScalarWhereInput
    data: XOR<ProfessionalAffiliationUpdateManyMutationInput, ProfessionalAffiliationUncheckedUpdateManyWithoutUserInput>
  }

  export type ProfessionalAffiliationScalarWhereInput = {
    AND?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
    OR?: ProfessionalAffiliationScalarWhereInput[]
    NOT?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
    id?: StringFilter<"ProfessionalAffiliation"> | string
    organization?: StringFilter<"ProfessionalAffiliation"> | string
    position?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    inclusiveYears?: StringFilter<"ProfessionalAffiliation"> | string
    createdAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    userId?: StringFilter<"ProfessionalAffiliation"> | string
    membershipProofUrl?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalAffiliation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
  }

  export type AwardRecognitionUpsertWithWhereUniqueWithoutUserInput = {
    where: AwardRecognitionWhereUniqueInput
    update: XOR<AwardRecognitionUpdateWithoutUserInput, AwardRecognitionUncheckedUpdateWithoutUserInput>
    create: XOR<AwardRecognitionCreateWithoutUserInput, AwardRecognitionUncheckedCreateWithoutUserInput>
  }

  export type AwardRecognitionUpdateWithWhereUniqueWithoutUserInput = {
    where: AwardRecognitionWhereUniqueInput
    data: XOR<AwardRecognitionUpdateWithoutUserInput, AwardRecognitionUncheckedUpdateWithoutUserInput>
  }

  export type AwardRecognitionUpdateManyWithWhereWithoutUserInput = {
    where: AwardRecognitionScalarWhereInput
    data: XOR<AwardRecognitionUpdateManyMutationInput, AwardRecognitionUncheckedUpdateManyWithoutUserInput>
  }

  export type AwardRecognitionScalarWhereInput = {
    AND?: AwardRecognitionScalarWhereInput | AwardRecognitionScalarWhereInput[]
    OR?: AwardRecognitionScalarWhereInput[]
    NOT?: AwardRecognitionScalarWhereInput | AwardRecognitionScalarWhereInput[]
    id?: StringFilter<"AwardRecognition"> | string
    awardName?: StringFilter<"AwardRecognition"> | string
    awardingBody?: StringFilter<"AwardRecognition"> | string
    yearReceived?: IntFilter<"AwardRecognition"> | number
    createdAt?: DateTimeFilter<"AwardRecognition"> | Date | string
    updatedAt?: DateTimeFilter<"AwardRecognition"> | Date | string
    userId?: StringFilter<"AwardRecognition"> | string
    certificateUrl?: StringNullableFilter<"AwardRecognition"> | string | null
    status?: EnumApprovalStatusFilter<"AwardRecognition"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"AwardRecognition"> | string | null
  }

  export type ProfessionalDevelopmentUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfessionalDevelopmentWhereUniqueInput
    update: XOR<ProfessionalDevelopmentUpdateWithoutUserInput, ProfessionalDevelopmentUncheckedUpdateWithoutUserInput>
    create: XOR<ProfessionalDevelopmentCreateWithoutUserInput, ProfessionalDevelopmentUncheckedCreateWithoutUserInput>
  }

  export type ProfessionalDevelopmentUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfessionalDevelopmentWhereUniqueInput
    data: XOR<ProfessionalDevelopmentUpdateWithoutUserInput, ProfessionalDevelopmentUncheckedUpdateWithoutUserInput>
  }

  export type ProfessionalDevelopmentUpdateManyWithWhereWithoutUserInput = {
    where: ProfessionalDevelopmentScalarWhereInput
    data: XOR<ProfessionalDevelopmentUpdateManyMutationInput, ProfessionalDevelopmentUncheckedUpdateManyWithoutUserInput>
  }

  export type ProfessionalDevelopmentScalarWhereInput = {
    AND?: ProfessionalDevelopmentScalarWhereInput | ProfessionalDevelopmentScalarWhereInput[]
    OR?: ProfessionalDevelopmentScalarWhereInput[]
    NOT?: ProfessionalDevelopmentScalarWhereInput | ProfessionalDevelopmentScalarWhereInput[]
    id?: StringFilter<"ProfessionalDevelopment"> | string
    title?: StringFilter<"ProfessionalDevelopment"> | string
    organizer?: StringFilter<"ProfessionalDevelopment"> | string
    dateLocation?: StringFilter<"ProfessionalDevelopment"> | string
    createdAt?: DateTimeFilter<"ProfessionalDevelopment"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalDevelopment"> | Date | string
    userId?: StringFilter<"ProfessionalDevelopment"> | string
    certificateFileUrl?: StringNullableFilter<"ProfessionalDevelopment"> | string | null
    status?: EnumApprovalStatusFilter<"ProfessionalDevelopment"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ProfessionalDevelopment"> | string | null
  }

  export type CommunityInvolvementUpsertWithWhereUniqueWithoutUserInput = {
    where: CommunityInvolvementWhereUniqueInput
    update: XOR<CommunityInvolvementUpdateWithoutUserInput, CommunityInvolvementUncheckedUpdateWithoutUserInput>
    create: XOR<CommunityInvolvementCreateWithoutUserInput, CommunityInvolvementUncheckedCreateWithoutUserInput>
  }

  export type CommunityInvolvementUpdateWithWhereUniqueWithoutUserInput = {
    where: CommunityInvolvementWhereUniqueInput
    data: XOR<CommunityInvolvementUpdateWithoutUserInput, CommunityInvolvementUncheckedUpdateWithoutUserInput>
  }

  export type CommunityInvolvementUpdateManyWithWhereWithoutUserInput = {
    where: CommunityInvolvementScalarWhereInput
    data: XOR<CommunityInvolvementUpdateManyMutationInput, CommunityInvolvementUncheckedUpdateManyWithoutUserInput>
  }

  export type CommunityInvolvementScalarWhereInput = {
    AND?: CommunityInvolvementScalarWhereInput | CommunityInvolvementScalarWhereInput[]
    OR?: CommunityInvolvementScalarWhereInput[]
    NOT?: CommunityInvolvementScalarWhereInput | CommunityInvolvementScalarWhereInput[]
    id?: StringFilter<"CommunityInvolvement"> | string
    engagementTitle?: StringFilter<"CommunityInvolvement"> | string
    role?: StringFilter<"CommunityInvolvement"> | string
    locationDate?: StringFilter<"CommunityInvolvement"> | string
    createdAt?: DateTimeFilter<"CommunityInvolvement"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityInvolvement"> | Date | string
    userId?: StringFilter<"CommunityInvolvement"> | string
    proofUrl?: StringNullableFilter<"CommunityInvolvement"> | string | null
    status?: EnumApprovalStatusFilter<"CommunityInvolvement"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"CommunityInvolvement"> | string | null
  }

  export type PublicationUpsertWithWhereUniqueWithoutUserInput = {
    where: PublicationWhereUniqueInput
    update: XOR<PublicationUpdateWithoutUserInput, PublicationUncheckedUpdateWithoutUserInput>
    create: XOR<PublicationCreateWithoutUserInput, PublicationUncheckedCreateWithoutUserInput>
  }

  export type PublicationUpdateWithWhereUniqueWithoutUserInput = {
    where: PublicationWhereUniqueInput
    data: XOR<PublicationUpdateWithoutUserInput, PublicationUncheckedUpdateWithoutUserInput>
  }

  export type PublicationUpdateManyWithWhereWithoutUserInput = {
    where: PublicationScalarWhereInput
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyWithoutUserInput>
  }

  export type PublicationScalarWhereInput = {
    AND?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
    OR?: PublicationScalarWhereInput[]
    NOT?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
    id?: StringFilter<"Publication"> | string
    researchTitle?: StringFilter<"Publication"> | string
    journal?: StringFilter<"Publication"> | string
    datePublished?: DateTimeFilter<"Publication"> | Date | string
    doiLink?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
    userId?: StringFilter<"Publication"> | string
    pdfUrl?: StringNullableFilter<"Publication"> | string | null
    status?: EnumApprovalStatusFilter<"Publication"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"Publication"> | string | null
  }

  export type ConferencePresentationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConferencePresentationWhereUniqueInput
    update: XOR<ConferencePresentationUpdateWithoutUserInput, ConferencePresentationUncheckedUpdateWithoutUserInput>
    create: XOR<ConferencePresentationCreateWithoutUserInput, ConferencePresentationUncheckedCreateWithoutUserInput>
  }

  export type ConferencePresentationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConferencePresentationWhereUniqueInput
    data: XOR<ConferencePresentationUpdateWithoutUserInput, ConferencePresentationUncheckedUpdateWithoutUserInput>
  }

  export type ConferencePresentationUpdateManyWithWhereWithoutUserInput = {
    where: ConferencePresentationScalarWhereInput
    data: XOR<ConferencePresentationUpdateManyMutationInput, ConferencePresentationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConferencePresentationScalarWhereInput = {
    AND?: ConferencePresentationScalarWhereInput | ConferencePresentationScalarWhereInput[]
    OR?: ConferencePresentationScalarWhereInput[]
    NOT?: ConferencePresentationScalarWhereInput | ConferencePresentationScalarWhereInput[]
    id?: StringFilter<"ConferencePresentation"> | string
    paperTitle?: StringFilter<"ConferencePresentation"> | string
    eventName?: StringFilter<"ConferencePresentation"> | string
    dateLocation?: StringFilter<"ConferencePresentation"> | string
    createdAt?: DateTimeFilter<"ConferencePresentation"> | Date | string
    updatedAt?: DateTimeFilter<"ConferencePresentation"> | Date | string
    userId?: StringFilter<"ConferencePresentation"> | string
    proofUrl?: StringNullableFilter<"ConferencePresentation"> | string | null
    status?: EnumApprovalStatusFilter<"ConferencePresentation"> | $Enums.ApprovalStatus
    rejectionReason?: StringNullableFilter<"ConferencePresentation"> | string | null
  }

  export type UserCreateWithoutAcademicQualificationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAcademicQualificationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAcademicQualificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAcademicQualificationsInput, UserUncheckedCreateWithoutAcademicQualificationsInput>
  }

  export type UserUpsertWithoutAcademicQualificationsInput = {
    update: XOR<UserUpdateWithoutAcademicQualificationsInput, UserUncheckedUpdateWithoutAcademicQualificationsInput>
    create: XOR<UserCreateWithoutAcademicQualificationsInput, UserUncheckedCreateWithoutAcademicQualificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAcademicQualificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAcademicQualificationsInput, UserUncheckedUpdateWithoutAcademicQualificationsInput>
  }

  export type UserUpdateWithoutAcademicQualificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAcademicQualificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProfessionalLicensesInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfessionalLicensesInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfessionalLicensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfessionalLicensesInput, UserUncheckedCreateWithoutProfessionalLicensesInput>
  }

  export type UserUpsertWithoutProfessionalLicensesInput = {
    update: XOR<UserUpdateWithoutProfessionalLicensesInput, UserUncheckedUpdateWithoutProfessionalLicensesInput>
    create: XOR<UserCreateWithoutProfessionalLicensesInput, UserUncheckedCreateWithoutProfessionalLicensesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfessionalLicensesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfessionalLicensesInput, UserUncheckedUpdateWithoutProfessionalLicensesInput>
  }

  export type UserUpdateWithoutProfessionalLicensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfessionalLicensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWorkExperiencesInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkExperiencesInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkExperiencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkExperiencesInput, UserUncheckedCreateWithoutWorkExperiencesInput>
  }

  export type UserUpsertWithoutWorkExperiencesInput = {
    update: XOR<UserUpdateWithoutWorkExperiencesInput, UserUncheckedUpdateWithoutWorkExperiencesInput>
    create: XOR<UserCreateWithoutWorkExperiencesInput, UserUncheckedCreateWithoutWorkExperiencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkExperiencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkExperiencesInput, UserUncheckedUpdateWithoutWorkExperiencesInput>
  }

  export type UserUpdateWithoutWorkExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProfessionalAffiliationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfessionalAffiliationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfessionalAffiliationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfessionalAffiliationsInput, UserUncheckedCreateWithoutProfessionalAffiliationsInput>
  }

  export type UserUpsertWithoutProfessionalAffiliationsInput = {
    update: XOR<UserUpdateWithoutProfessionalAffiliationsInput, UserUncheckedUpdateWithoutProfessionalAffiliationsInput>
    create: XOR<UserCreateWithoutProfessionalAffiliationsInput, UserUncheckedCreateWithoutProfessionalAffiliationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfessionalAffiliationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfessionalAffiliationsInput, UserUncheckedUpdateWithoutProfessionalAffiliationsInput>
  }

  export type UserUpdateWithoutProfessionalAffiliationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfessionalAffiliationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAwardsRecognitionsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAwardsRecognitionsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAwardsRecognitionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAwardsRecognitionsInput, UserUncheckedCreateWithoutAwardsRecognitionsInput>
  }

  export type UserUpsertWithoutAwardsRecognitionsInput = {
    update: XOR<UserUpdateWithoutAwardsRecognitionsInput, UserUncheckedUpdateWithoutAwardsRecognitionsInput>
    create: XOR<UserCreateWithoutAwardsRecognitionsInput, UserUncheckedCreateWithoutAwardsRecognitionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAwardsRecognitionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAwardsRecognitionsInput, UserUncheckedUpdateWithoutAwardsRecognitionsInput>
  }

  export type UserUpdateWithoutAwardsRecognitionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAwardsRecognitionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProfessionalDevelopmentsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfessionalDevelopmentsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfessionalDevelopmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfessionalDevelopmentsInput, UserUncheckedCreateWithoutProfessionalDevelopmentsInput>
  }

  export type UserUpsertWithoutProfessionalDevelopmentsInput = {
    update: XOR<UserUpdateWithoutProfessionalDevelopmentsInput, UserUncheckedUpdateWithoutProfessionalDevelopmentsInput>
    create: XOR<UserCreateWithoutProfessionalDevelopmentsInput, UserUncheckedCreateWithoutProfessionalDevelopmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfessionalDevelopmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfessionalDevelopmentsInput, UserUncheckedUpdateWithoutProfessionalDevelopmentsInput>
  }

  export type UserUpdateWithoutProfessionalDevelopmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfessionalDevelopmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCommunityInvolvementsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommunityInvolvementsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommunityInvolvementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommunityInvolvementsInput, UserUncheckedCreateWithoutCommunityInvolvementsInput>
  }

  export type UserUpsertWithoutCommunityInvolvementsInput = {
    update: XOR<UserUpdateWithoutCommunityInvolvementsInput, UserUncheckedUpdateWithoutCommunityInvolvementsInput>
    create: XOR<UserCreateWithoutCommunityInvolvementsInput, UserUncheckedCreateWithoutCommunityInvolvementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommunityInvolvementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommunityInvolvementsInput, UserUncheckedUpdateWithoutCommunityInvolvementsInput>
  }

  export type UserUpdateWithoutCommunityInvolvementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommunityInvolvementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPublicationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPublicationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    conferencePresentations?: ConferencePresentationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPublicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPublicationsInput, UserUncheckedCreateWithoutPublicationsInput>
  }

  export type UserUpsertWithoutPublicationsInput = {
    update: XOR<UserUpdateWithoutPublicationsInput, UserUncheckedUpdateWithoutPublicationsInput>
    create: XOR<UserCreateWithoutPublicationsInput, UserUncheckedCreateWithoutPublicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPublicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPublicationsInput, UserUncheckedUpdateWithoutPublicationsInput>
  }

  export type UserUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    conferencePresentations?: ConferencePresentationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutConferencePresentationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementCreateNestedManyWithoutUserInput
    publications?: PublicationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConferencePresentationsInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    academicQualifications?: AcademicQualificationUncheckedCreateNestedManyWithoutUserInput
    professionalLicenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutUserInput
    workExperiences?: WorkExperienceUncheckedCreateNestedManyWithoutUserInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutUserInput
    awardsRecognitions?: AwardRecognitionUncheckedCreateNestedManyWithoutUserInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedCreateNestedManyWithoutUserInput
    communityInvolvements?: CommunityInvolvementUncheckedCreateNestedManyWithoutUserInput
    publications?: PublicationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConferencePresentationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConferencePresentationsInput, UserUncheckedCreateWithoutConferencePresentationsInput>
  }

  export type UserUpsertWithoutConferencePresentationsInput = {
    update: XOR<UserUpdateWithoutConferencePresentationsInput, UserUncheckedUpdateWithoutConferencePresentationsInput>
    create: XOR<UserCreateWithoutConferencePresentationsInput, UserUncheckedCreateWithoutConferencePresentationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConferencePresentationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConferencePresentationsInput, UserUncheckedUpdateWithoutConferencePresentationsInput>
  }

  export type UserUpdateWithoutConferencePresentationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUpdateManyWithoutUserNestedInput
    publications?: PublicationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConferencePresentationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academicQualifications?: AcademicQualificationUncheckedUpdateManyWithoutUserNestedInput
    professionalLicenses?: ProfessionalLicenseUncheckedUpdateManyWithoutUserNestedInput
    workExperiences?: WorkExperienceUncheckedUpdateManyWithoutUserNestedInput
    professionalAffiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutUserNestedInput
    awardsRecognitions?: AwardRecognitionUncheckedUpdateManyWithoutUserNestedInput
    professionalDevelopments?: ProfessionalDevelopmentUncheckedUpdateManyWithoutUserNestedInput
    communityInvolvements?: CommunityInvolvementUncheckedUpdateManyWithoutUserNestedInput
    publications?: PublicationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AcademicQualificationCreateManyUserInput = {
    id?: string
    degree: string
    institution: string
    program: string
    yearCompleted: number
    createdAt?: Date | string
    updatedAt?: Date | string
    diplomaFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalLicenseCreateManyUserInput = {
    id?: string
    examination: string
    monthYear: string
    licenseNumber: string
    expiration: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    licenseFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type WorkExperienceCreateManyUserInput = {
    id?: string
    institution: string
    position: string
    natureOfWork?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalAffiliationCreateManyUserInput = {
    id?: string
    organization: string
    position?: string | null
    inclusiveYears: string
    createdAt?: Date | string
    updatedAt?: Date | string
    membershipProofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AwardRecognitionCreateManyUserInput = {
    id?: string
    awardName: string
    awardingBody: string
    yearReceived: number
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ProfessionalDevelopmentCreateManyUserInput = {
    id?: string
    title: string
    organizer: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificateFileUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type CommunityInvolvementCreateManyUserInput = {
    id?: string
    engagementTitle: string
    role: string
    locationDate: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type PublicationCreateManyUserInput = {
    id?: string
    researchTitle: string
    journal: string
    datePublished: Date | string
    doiLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pdfUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type ConferencePresentationCreateManyUserInput = {
    id?: string
    paperTitle: string
    eventName: string
    dateLocation: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proofUrl?: string | null
    status?: $Enums.ApprovalStatus
    rejectionReason?: string | null
  }

  export type AcademicQualificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    yearCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diplomaFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademicQualificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    yearCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diplomaFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademicQualificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    yearCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diplomaFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalLicenseUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    examination?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenseFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalLicenseUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    examination?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenseFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalLicenseUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    examination?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    expiration?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenseFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkExperienceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    natureOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkExperienceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    natureOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkExperienceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    natureOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalAffiliationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membershipProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalAffiliationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membershipProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalAffiliationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    inclusiveYears?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membershipProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AwardRecognitionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    awardName?: StringFieldUpdateOperationsInput | string
    awardingBody?: StringFieldUpdateOperationsInput | string
    yearReceived?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AwardRecognitionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    awardName?: StringFieldUpdateOperationsInput | string
    awardingBody?: StringFieldUpdateOperationsInput | string
    yearReceived?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AwardRecognitionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    awardName?: StringFieldUpdateOperationsInput | string
    awardingBody?: StringFieldUpdateOperationsInput | string
    yearReceived?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalDevelopmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalDevelopmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalDevelopmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizer?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificateFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityInvolvementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementTitle?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    locationDate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityInvolvementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementTitle?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    locationDate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommunityInvolvementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementTitle?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    locationDate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    researchTitle?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    datePublished?: DateTimeFieldUpdateOperationsInput | Date | string
    doiLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    researchTitle?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    datePublished?: DateTimeFieldUpdateOperationsInput | Date | string
    doiLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    researchTitle?: StringFieldUpdateOperationsInput | string
    journal?: StringFieldUpdateOperationsInput | string
    datePublished?: DateTimeFieldUpdateOperationsInput | Date | string
    doiLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConferencePresentationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperTitle?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConferencePresentationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperTitle?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConferencePresentationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperTitle?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    dateLocation?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApprovalStatusFieldUpdateOperationsInput | $Enums.ApprovalStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}