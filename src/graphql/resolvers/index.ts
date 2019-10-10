import Query from './query'
import Mutation from './mutation'
import FieldResolvers from './field-resolver'

export default {
  Query,
  Mutation,
  ...FieldResolvers,
}
