import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CtaOutlineLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  className?: string;
  size?: VariantProps<typeof buttonVariants>['size'];
};

export function CtaOutlineLink({ className, size = 'lg', ...props }: CtaOutlineLinkProps) {
  return <Link className={cn(buttonVariants({ variant: 'cinematicOutline', size }), className)} {...props} />;
}
