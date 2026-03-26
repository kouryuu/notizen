import type { Tag } from "@/types"
import { TAG_TYPES } from "@/types"
import { TimeTag } from "./TimeTag"
import { ColorTag } from "./ColorTag"
import { CheckboxTag } from "./CheckboxTag"
import { CodeTag } from "./CodeTag"
import { SecretTag } from "./SecretTag"
import { RemindTag } from "./RemindTag"

export function TagDisplay({ noteId, tag }: { noteId: string; tag: Tag }) {
  switch (tag.type) {
    case TAG_TYPES.TIME:
      return <TimeTag noteId={noteId} tag={tag} />
    case TAG_TYPES.COLOR:
      return <ColorTag noteId={noteId} tag={tag} />
    case TAG_TYPES.CHECKBOX:
      return <CheckboxTag noteId={noteId} tag={tag} />
    case TAG_TYPES.CODE:
      return <CodeTag noteId={noteId} tag={tag} />
    case TAG_TYPES.SECRET:
      return <SecretTag noteId={noteId} tag={tag} />
    case TAG_TYPES.REMIND:
      return <RemindTag noteId={noteId} tag={tag} />
  }
}
