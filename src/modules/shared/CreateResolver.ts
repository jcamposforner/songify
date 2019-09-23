import { ClassType, Resolver, Mutation, UseMiddleware, Arg } from 'type-graphql'
import { Middleware } from 'type-graphql/dist/interfaces/Middleware'

export default function createResolver<
  T extends ClassType,
  K extends ClassType
>(
  suffix: string,
  returnType: T,
  inputType: K,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg('data', () => inputType) data: any) {
      return entity.create(data).save()
    }
  }

  return BaseResolver
}
