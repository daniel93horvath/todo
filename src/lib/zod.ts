// src/shared/libs/zod.ts

import { z as baseZ, ZodIssueCode, ZodErrorMap } from "zod";

/**
 * Egyedi magyar hibaüzeneteket meghatározó map.
 * Ha a sémában nem adtunk meg explicit (pl. required_error) üzenetet,
 * akkor a Zod ezt a mapet fogja használni a hiba generálásakor.
 */
const customErrorMap: ZodErrorMap = (issue, ctx) => {
	let message: string;

	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			if (issue.received === "undefined") {
				// Például kötelező mezőt egyáltalán nem adtak meg
				message = "Kötelező mező.";
			} else {
				message = `Nem megfelelő típus: "${issue.received}". 
          "${issue.expected}" típus várható.`;
			}
			break;

		case ZodIssueCode.invalid_literal:
			// Például, ha z.literal("admin") volt, de nem "admin" jött
			message = `Az értéknek pontosan "${JSON.stringify(issue.expected)}" kell lennie.`;
			break;

		case ZodIssueCode.unrecognized_keys:
			// Ismeretlen kulcsok az objektumban, amiket a séma nem enged
			message = `Ismeretlen mező(k): ${issue.keys.join(", ")}.`;
			break;

		case ZodIssueCode.invalid_union:
			// z.union(...) egyik változata sem érvényes
			message = "Az adat egyik lehetséges formátumnak sem felel meg.";
			break;

		case ZodIssueCode.invalid_union_discriminator:
			// Diszkriminátor alapú unionnál (pl. {type: 'a' | 'b'}) rossz 'type' jött
			message = `Érvénytelen diszkriminátor érték. Lehetséges értékek: ${issue.options.join(
				", "
			)}.`;
			break;

		case ZodIssueCode.invalid_enum_value:
			// z.enum(["hu", "en"]) -> rossz string érkezett
			message = `Érvénytelen enum érték. Várt: ${issue.options.join(", ")}, kaptam: "${
				issue.received
			}".`;
			break;

		case ZodIssueCode.invalid_arguments:
			message = "Hibás függvény argumentum.";
			break;

		case ZodIssueCode.invalid_return_type:
			message = "Hibás függvény visszatérési típus.";
			break;

		case ZodIssueCode.invalid_date:
			message = "Érvénytelen dátum.";
			break;

		case ZodIssueCode.invalid_string:
			// Itt a "validation" mező alapján különböző string típusú hibák jöhetnek
			if (issue.validation === "email") {
				message = "Érvénytelen email formátum.";
			} else if (issue.validation === "url") {
				message = "Érvénytelen URL formátum.";
			} else if (issue.validation === "regex") {
				message = "A megadott érték nem illeszkedik a kívánt mintához (regex).";
			} else if (issue.validation === "uuid") {
				message = "Érvénytelen UUID formátum.";
			} else if (issue.validation === "cuid") {
				/**
				 * A CUID (Collision-resistant Unique ID) egy olyan egyedi azonosító formátum,
				 * amely tipikusan "c" betűvel kezdődik (pl. cktmpg2qw0000h1mlbuixat3b),
				 * és a generált azonosítók ütközésének esélye rendkívül alacsony.
				 */
				message = "Érvénytelen CUID formátum.";
			} else if (issue.validation === "cuid2") {
				message = "Érvénytelen CUID2 formátum.";
			} else if (issue.validation === "ulid") {
				message = "Érvénytelen ULID formátum.";
			} else {
				message = "Érvénytelen string formátum.";
			}
			break;

		case ZodIssueCode.too_small:
			// Például: túl rövid string, túl kevés elem a tömbben, túl kicsi szám
			if (issue.type === "array") {
				message = `Legalább ${issue.minimum} elemet kell tartalmaznia.`;
			} else if (issue.type === "string") {
				message = `Minimum ${issue.minimum} karakter kötelező.`;
			} else if (issue.type === "number") {
				message = `Az értéknek legalább ${issue.minimum}-nek kell lennie.`;
			} else {
				message = `Érték túl kicsi. Minimum: ${issue.minimum}.`;
			}
			break;

		case ZodIssueCode.too_big:
			// Például: túl hosszú string, túl sok elem a tömbben, túl nagy szám
			if (issue.type === "array") {
				message = `Legfeljebb ${issue.maximum} elemet tartalmazhat.`;
			} else if (issue.type === "string") {
				message = `Legfeljebb ${issue.maximum} karakter hosszú lehet.`;
			} else if (issue.type === "number") {
				message = `Az értéknek legfeljebb ${issue.maximum}-nek kell lennie.`;
			} else {
				message = `Érték túl nagy. Maximum: ${issue.maximum}.`;
			}
			break;

		case ZodIssueCode.custom:
			// refine() vagy custom() által dobott hiba
			message = "Érvénytelen adat.";
			break;

		case ZodIssueCode.invalid_intersection_types:
			message = "A metszet típusai nem egyeztethetők össze.";
			break;

		case ZodIssueCode.not_multiple_of:
			message = `Az értéknek a(z) ${issue.multipleOf} többszörösének kell lennie.`;
			break;

		case ZodIssueCode.not_finite:
			message = "A szám végesnek kell lennie.";
			break;

		default:
			// Ha valami kimaradt, fallback
			message = ctx.defaultError;
			break;
	}

	return { message };
};

// Globálisan alkalmazzuk a magyar nyelvű errorMapet
baseZ.setErrorMap(customErrorMap);

/**
 * Ez lesz az exportált, "magyarosított" Zod objektum.
 * A projektben mindenhol ezt importáld:
 *
 * import { z } from "@/shared/libs/zod";
 *
 * Így automatikusan magyar nyelvű hibaüzeneteket kapsz.
 */
export { baseZ as zod };
