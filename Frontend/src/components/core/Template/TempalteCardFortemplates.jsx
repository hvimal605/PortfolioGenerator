import TemplateCardFree from "./TemplateCardFree";
import TemplateCardPremium from "./TemplateCardPremium";

export default function TemplateCardFortemplates({ template, onSelect }) {
  if (template.templateType === "premium") {
    return <TemplateCardPremium template={template} onSelect={onSelect} />;
  } else {
    return <TemplateCardFree template={template} onSelect={onSelect} />;
  }
}
