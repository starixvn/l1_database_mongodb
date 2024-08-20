import type { AnyBulkWriteOperation as AnyBulkWriteOperationType, Document as DocumentType, EJSON as EJSONType, IndexDescription as IndexDescriptionType, ObjectId as ObjectIdType } from "@ldb/mongo";
import type { CollationOptions as CollationOptionsType, CreateCollectionOptions as CreateCollectionOptionsType } from "@mongosh/service-provider-core";
import type { BulkWriteResult as BulkWriteResultType, Database as DatabaseType, ReplicaSet as ReplicaSetType } from "@mongosh/shell-api";
import pathModule from "path";
import type biColumnType from "./modules/bi/data-types.cjs";

/** Re-export */
declare global {
    var path: typeof pathModule;

    var db: Database;
    var rs: ReplicaSet;
    var ObjectId: (id?: string | number | ObjectIdType | Buffer) => ObjectIdType;
    var EJSON: typeof EJSONType;

    type AnyBulkWriteOperation = AnyBulkWriteOperationType;
    type BsonDocument = DocumentType;
    type BulkWriteResult = BulkWriteResultType;
    type CreateCollectionOptions = CreateCollectionOptionsType;
    type Database = DatabaseType;
    type IndexDescription = IndexDescriptionType;
    type IndexConfig = Record<string, { key: IndexDescription["key"]; options: Omit<IndexDescription, "key"> }>;
    type ReplicaSet = ReplicaSetType;
}

/** Custom type */
declare global {
    type Identity = { _id: string; L: number; stage: "active" | "archive" | "mixed" };
}

/** Collation */
declare global {
    type Locale =
        | "simple"
        | "af"
        | "sq"
        | "am"
        | "ar"
        | "ar@collation=compat"
        | "hy"
        | "as"
        | "az"
        | "az@collation=search"
        | "bn"
        | "be"
        | "bn@collation=traditional"
        | "bs"
        | "bs@collation=search"
        | "bs_Cyrl"
        | "bg"
        | "my"
        | "ca"
        | "ca@collation=search"
        | "chr"
        | "zh"
        | "zh@collation=big5han"
        | "zh@collation=gb2312han"
        | "zh@collation=unihan"
        | "zh@collation=zhuyin"
        | "zh_Hant"
        | "hr"
        | "hr@collation=search"
        | "cs"
        | "cs@collation=search"
        | "da"
        | "da@collation=search"
        | "nl"
        | "dz"
        | "en"
        | "en_US"
        | "en_US_POSIX"
        | "eo"
        | "et"
        | "ee"
        | "fo"
        | "fil"
        | "fi"
        | "fi@collation=search"
        | "fi@collation=traditional"
        | "fr"
        | "fr_CA"
        | "gl"
        | "gl@collation=search"
        | "ka"
        | "de"
        | "de@collation=search"
        | "de@collation=eor"
        | "de@collation=phonebook"
        | "de_AT"
        | "el"
        | "gu"
        | "ha"
        | "haw"
        | "he"
        | "he@collation=search"
        | "hi"
        | "hu"
        | "is"
        | "is@collation=search"
        | "ig"
        | "smn"
        | "smn@collation=search"
        | "id"
        | "ga"
        | "it"
        | "ja"
        | "ja@collation=unihan"
        | "kl"
        | "kl@collation=search"
        | "kn"
        | "kn@collation=traditional"
        | "kk"
        | "km"
        | "kok"
        | "ko"
        | "ko@collation=search"
        | "ko@collation=searchjl"
        | "ko@collation=unihan"
        | "ky"
        | "lkt"
        | "lo"
        | "lv"
        | "ln"
        | "ln@collation=phonetic"
        | "lt"
        | "dsb"
        | "lb"
        | "mk"
        | "ms"
        | "ml"
        | "mt"
        | "mr"
        | "mn"
        | "ne"
        | "se"
        | "se@collation=search"
        | "nb"
        | "nb@collation=search"
        | "nn"
        | "nn@collation=search"
        | "or"
        | "om"
        | "ps"
        | "fa"
        | "fa_AF"
        | "pl"
        | "pt"
        | "pa"
        | "ro"
        | "ru"
        | "sr"
        | "sr_Latn"
        | "sr_Latn@collation=search"
        | "si"
        | "si@collation=dictionary"
        | "sk"
        | "sk@collation=search"
        | "sl"
        | "es"
        | "es@collation=search"
        | "es@collation=traditional"
        | "sw"
        | "sv"
        | "sv@collation=search"
        | "ta"
        | "te"
        | "th"
        | "bo"
        | "to"
        | "tr"
        | "tr@collation=search"
        | "uk"
        | "hsb"
        | "ur"
        | "ug"
        | "vi"
        | "vi@collation=traditional"
        | "wae"
        | "cy"
        | "yi"
        | "yi@collation=search"
        | "yo"
        | "zu";
    type Strength = 1 | 2 | 3 | 4 | 5;
    type CollationOptions = CollationOptionsType;
    type Collation = CollationOptions & { locale: Locale; strength?: Strength };
}

/** BI */
declare global {
    type BIColumnType = (typeof biColumnType)[keyof typeof biColumnType];
    type BIColumn = { mongo_name: string; sql_name: string } & BIColumnType;
    type BITable = {
        _id: { db: string; table: string };
        source?: string;
        pipeline?: string;
        columns: BIColumn[];
    };
}
