import type {
  GroupBase,
  GroupHeadingProps,
  IndicatorsContainerProps,
  MenuProps,
} from 'react-select';
import type { MultiValueRemoveProps } from 'react-select';
// import { CloseIcon } from '../Icons';
import type { OptionProps } from 'react-select';
import { MenuItem } from '../MenuItem/MenuItem';
import type { ValueContainerProps } from 'react-select';
import { components, type ControlProps } from 'react-select';
import { IconButton } from '../IconButton';
import { cn } from '~/utils/tailwind/cn';

const Control = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: ControlProps<Option, IsMulti, Group>
) => (
  <div
    className={cn(
      'rounded bg-background px-2',
      props.isDisabled && 'opacity-60'
    )}
  >
    <components.Control {...props} />
  </div>
);

const IndicatorsContainer = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: IndicatorsContainerProps<Option, IsMulti, Group>
) => {
  return (
    <IconButton>
      <components.IndicatorsContainer {...props} />
    </IconButton>
  );
};

const GroupHeading = (props: GroupHeadingProps<any>) => {
  const { children } = props;
  return (
    <div className='cursor-default'>
      <div>{children}</div>
    </div>
  );
};

const Option = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  const { data, innerRef, innerProps } = props;

  return (
    // override for the time being, react select expect a div and I am usng a button
    <MenuItem compact ref={innerRef as any} {...(innerProps as any)}>
      <div className='rounded-full bg-primary py-1 px-2'>
        {(data as any).label}
      </div>
    </MenuItem>
  );
};

const ValueContainer = ({ children, ...props }: ValueContainerProps<any>) => (
  <div {...props} className='flex flex-row flex-wrap gap-2'>
    {children}
  </div>
);

const MultiValueRemove = (props: MultiValueRemoveProps<any>) => {
  const { innerProps, selectProps } = props;

  if (!selectProps.menuIsOpen) return null;

  return (
    <div
      {...innerProps}
      className='flex cursor-pointer items-center justify-center rounded-e hover:text-slate-300'
      style={{
        backgroundColor: props.data.color,
      }}
    >
      close..
    </div>
  );
};

const Menu = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MenuProps<Option, IsMulti, Group>
) => {
  return (
    <components.Menu<Option, IsMulti, Group>
      {...props}
      className='z-[9999] rounded p-2 bg-background-paper'
    >
      {props.children}
    </components.Menu>
  );
};

export const SelectComponents = {
  Control,
  IndicatorsContainer,
  Option,
  ValueContainer,
  MultiValueRemove,
  Menu,
};
