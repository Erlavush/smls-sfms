
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.SpecializationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AcademicQualificationScalarFieldEnum = {
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

exports.Prisma.ProfessionalLicenseScalarFieldEnum = {
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

exports.Prisma.WorkExperienceScalarFieldEnum = {
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

exports.Prisma.ProfessionalAffiliationScalarFieldEnum = {
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

exports.Prisma.AwardRecognitionScalarFieldEnum = {
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

exports.Prisma.ProfessionalDevelopmentScalarFieldEnum = {
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

exports.Prisma.CommunityInvolvementScalarFieldEnum = {
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

exports.Prisma.PublicationScalarFieldEnum = {
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

exports.Prisma.ConferencePresentationScalarFieldEnum = {
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

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  message: 'message',
  link: 'link',
  isRead: 'isRead',
  createdAt: 'createdAt',
  userId: 'userId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  FACULTY: 'FACULTY',
  ADMIN: 'ADMIN'
};

exports.ApprovalStatus = exports.$Enums.ApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.Prisma.ModelName = {
  Specialization: 'Specialization',
  User: 'User',
  AcademicQualification: 'AcademicQualification',
  ProfessionalLicense: 'ProfessionalLicense',
  WorkExperience: 'WorkExperience',
  ProfessionalAffiliation: 'ProfessionalAffiliation',
  AwardRecognition: 'AwardRecognition',
  ProfessionalDevelopment: 'ProfessionalDevelopment',
  CommunityInvolvement: 'CommunityInvolvement',
  Publication: 'Publication',
  ConferencePresentation: 'ConferencePresentation',
  Notification: 'Notification'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
