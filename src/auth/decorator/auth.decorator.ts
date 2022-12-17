import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../interfaces';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { RoleProtector } from './role-protector.decorator';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtector(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
