import TranslationRepo from "domain/enums/TranslationRepo";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { getSelectedEngine } from "~/store/selectors/chatSelectors";
import { updateSelectedEngine } from "~/store/slices/chatSlice";
import SidepanelButton from "./SidepanelButton";

const PICKER_CONFIG: Record<
  TranslationRepo,
  { label: string; className: string }
> = {
  [TranslationRepo.YODA]: { label: "Yoda", className: "" },
  [TranslationRepo.PIRATE]: { label: "Pirate", className: "" },
};

export default function ModelPicker() {
  const dispatch = useDispatch();
  const selectedEngine = useAppSelector(getSelectedEngine);
  const repoList = Object.keys(PICKER_CONFIG) as TranslationRepo[];

  const onSelectModel = useCallback(
    (engine: TranslationRepo) => {
      dispatch(updateSelectedEngine(engine));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col gap-1">
      <b>Pick a model:</b>
      <div className="grid grid-cols-2 gap-2">
        {repoList.map((repoModel) => (
          <SidepanelButton
            key={repoModel}
            isSelected={repoModel === selectedEngine}
            layoutId="model-picker"
            onSelect={() => onSelectModel(repoModel)}
          >
            {PICKER_CONFIG[repoModel].label}
          </SidepanelButton>
        ))}
      </div>
    </div>
  );
}
