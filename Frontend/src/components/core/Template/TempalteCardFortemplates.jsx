import TemplateCardFree from "./TemplateCardFree";
import TemplateCardPremium from "./TemplateCardPremium";

export default function TemplateCardFortemplates({ template, onSelect, onPreview }) {
  if (template.templateType === "premium") {
    return <TemplateCardPremium template={template} onSelect={onSelect} onPreview={onPreview} />;
  } else {
    return <TemplateCardFree template={template} onSelect={onSelect} onPreview={onPreview} />;
  }
}
