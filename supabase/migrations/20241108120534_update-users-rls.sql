create policy "Enable update for authenticated user"
on "public"."users"
as permissive
for update
to authenticated
using (true);



