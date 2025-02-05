import ReactSelect, { GroupBase, Props } from 'react-select';
import { SelectComponents } from './Components';

export function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group>) {
  const { components, ...rest } = props;

  return (
    <ReactSelect
      classNames={{
        container: () => 'w-full text-left',
        input: () => 'cursor-pointer',
        menu: () => 'bg-bkg-paper shadow-xl',
        singleValue: () => 'flex',
        valueContainer: () => 'flex flex-row',
      }}
      unstyled
      isClearable={false}
      components={{
        Control: SelectComponents.Control,
        Option: SelectComponents.Option,
        IndicatorsContainer: SelectComponents.IndicatorsContainer,
        Menu: SelectComponents.Menu,
        ValueContainer: SelectComponents.ValueContainer,
        ...components,
      }}
      {...rest}
    />
  );
}
