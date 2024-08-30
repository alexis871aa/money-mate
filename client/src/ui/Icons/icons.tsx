import { FC } from "react";
import { Icon } from "./Icon/Icon";

export interface IconProps {
  onClick?: () => void;
  $size?: string;
  $margin?: string;
  $disabled?: boolean;
}

export const DashboardIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-chart-line" {...props} />
);

export const TransactionsIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-credit-card" {...props} />
);

export const CategoriesIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-tags" {...props} />
);

export const AccountsIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-wallet" {...props} />
);

export const SettingsIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-cog" {...props} />
);

export const LogoutIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-sign-out" {...props} />
);

export const TrendIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-money-bill-trend-up" {...props} />
);

export const ExpensesIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-money-bill-transfer" {...props} />
);

export const MoneyIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-money-bill" {...props} />
);

export const FreelanceIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-earth-americas" {...props} />
);

export const StocksIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-arrow-trend-up" {...props} />
);

export const BitcoinIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-brands fa-bitcoin" {...props} />
);

export const PiggyIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-piggy-bank" {...props} />
);

export const YtIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-brands fa-youtube" {...props} />
);

export const CardIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-brands fa-cc-visa" {...props} />
);

export const UsersIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-users-between-lines" {...props} />
);

export const DollarIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-dollar-sign" {...props} />
);

export const CalendarIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-calendar" {...props} />
);

export const CommentIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-comment" {...props} />
);

export const PlusIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-plus" {...props} />
);

export const TrashIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-trash" {...props} />
);

export const SignoutIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-right-from-bracket" {...props} />
);

export const TakeawayIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-utensils" {...props} />
);

export const ClothingIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-shirt" {...props} />
);

export const BookIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-book-open" {...props} />
);

export const FoodIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-bowl-food" {...props} />
);

export const MedicalIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-briefcase-medical" {...props} />
);

export const TvIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-tv" {...props} />
);

export const CircleIcon: FC<IconProps> = ({ ...props }) => (
  <Icon icon="fa-solid fa-circle-dot" {...props} />
);
